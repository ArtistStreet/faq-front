import { useQuery, useMutation } from '@apollo/client/react';
import { useState } from 'react';
import ModalConfirm from '@/components/partials/ModalConfirm';
import { useTranslation } from 'react-i18next';
import { find } from 'lodash';
import { showToast } from '@/utils/common';
import { FAQ_CREATE, FAQ_DELETE, FAQ_LIST, FAQ_UPDATE } from '@/services/FAQServices';
import Faq, { FaqFormInput, FaqQuery } from '@/types/Faq';
import ListFAQ from '../components/ListFAQ';
import Pagination from '@/components/partials/Pagination';
import SearchForm from '@/components/partials/SearchForm';
import { useSearchParams } from 'react-router-dom';
import ModalFaqUpdate from '../components/ModalFaqUpdate';
import { CategoryQuery } from '@/types/Category';
import { CATEGORY_LIST } from '@/services/CategoryServices';

export default function FaqList() {
     const [showDelete, setShowDelete] = useState(false);
     const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);
     const [showModal, setShowModal] = useState(false);
     const [currentFaq, setCurrentFaq] = useState<Faq | null>(null);
     const { t } = useTranslation();
     const [page, setPage] = useState(1);
     const limit = 5; // có thể để user chọn
     const [searchParams] = useSearchParams();

     const searchTerm = searchParams.get('search') || '';
     const roleIds = searchParams.get('role')
          ? searchParams.get('role')!.split(',').map(Number)
          : [];

     const filters =
          roleIds.length > 0
               ? [`role:[](${roleIds.join(',')})`]
               : null;

     const { loading: loading, data: faqData } = useQuery<FaqQuery>(FAQ_LIST, {
          variables: {
               search: searchTerm || null,
               filters,
               page,
               limit,
          },
     });

     const { data: catData } = useQuery<CategoryQuery>(CATEGORY_LIST, {
          variables: {
               search: searchTerm || null,
               filters,
               page,
               limit,
          },
     });

     const category = catData?.categoryList.data;

     const [deleteFaq, { loading: deleting }] = useMutation(FAQ_DELETE, {
          refetchQueries: ['FAQList'], // refetch cả root và children nếu cần
          onCompleted: () => {
               showToast(true, [t('success.update')]);
               setShowDelete(false);
               setItemIdToDelete(null);
          },
          onError: (error) => {
               showToast(false, [error.message]);
               setShowDelete(false);
          },
     });

     const [saveFaq, { loading: saving }] = useMutation(currentFaq?.id ? FAQ_UPDATE : FAQ_CREATE, {
          refetchQueries: ['FAQList'], // reload dữ liệu sau khi lưu
          onCompleted: (data) => {
               const message = currentFaq?.id ? 'Cập nhật thành công!' : 'Tạo nhóm mới thành công!';
               showToast(true, [message]);
               closeModal();
          },
          onError: (error) => {
               showToast(false, [error.message]);
          },
     });

     // const faq: Faq[] = faqData?.faqList?.data.filter((i) => {
     //      const autoParentId = pathIds.length > 0 ? pathIds[pathIds.length - 1] : null;

     //      return i.group_id === autoParentId;
     // }) ?? [];

     const faq: Faq[] = faqData?.faqList.data ?? [];

     const handleSubmit = async (formData:
          FaqFormInput
     ) => {
          const finalData = {
               answer: formData.answer,
               question: formData.question,
               categoryIds: formData.categoryIds,
          };

          const variables = currentFaq?.id
               ? {
                    id: currentFaq.id,
                    input: finalData,
               }
               : {
                    input: finalData,
               };

          await saveFaq({ variables });
     };

     // Hàm mở modal Create
     const handleCreate = () => {
          setShowModal(true);
     };

     // Hàm mở modal Update
     const handleUpdate = (faq: Faq) => {
          setCurrentFaq(faq);
          setShowModal(true);
     };

     // Hàm đóng modal
     const closeModal = () => {
          setShowModal(false);
     };

     const handleDelete = (id: number) => {
          setItemIdToDelete(id);
          setShowDelete(true);
     };

     const confirmDelete = async () => {
          if (!itemIdToDelete) return;

          await deleteFaq({ variables: { id: itemIdToDelete } });
     };

     // Hủy xóa
     const cancelDelete = () => {
          setShowDelete(false);
          setItemIdToDelete(null);
     };

     const total = faqData?.faqList.totalCount || 0;

     return (
          <>
               <div className="container py-4">
                    <SearchForm
                         fields={[
                              { name: 'search', type: 'text', label: 'Từ khóa', wrapClassName: 'col-md-4 col-12' },
                              // {
                              //      name: 'role',
                              //      type: 'select',
                              //      label: 'Trạng thái',
                              //      wrapClassName: 'col-md-4 col-12',
                              //      options: {
                              //           multiple: true,
                              //           choices: convertConstantToSelectOptions(RoleName, t, true),
                              //      },
                              // },
                         ]}
                         isLoading={loading}
                         searchClass="col-md-4 pt-2"
                    />

                    <div className="card shadow-sm">
                         <div className="card-body">
                              {faq.length === 0 ? (
                                   <p className="text-muted text-center py-4">Không có nhóm nào.</p>
                              ) : (
                                   <ListFAQ
                                        items={faq}
                                        page={page}
                                        category={category}
                                        limit={limit}
                                        handleDelete={handleDelete}
                                        handleUpdate={handleUpdate}
                                   />
                              )}
                         </div>
                         <div className="text-end border-0">
                              <button className="btn btn-primary" onClick={handleCreate}>
                                   Thêm
                              </button>
                         </div>
                         <Pagination limit={limit} total={total} page={page} setPage={setPage} />
                    </div>
                    <ModalFaqUpdate
                         show={showModal}
                         faq={currentFaq} // null = create, có data = update
                         category={category}
                         isLoading={saving}
                         changeShow={closeModal}
                         submitAction={handleSubmit}
                    />
                    <ModalConfirm
                         show={showDelete}
                         text={t('confirm.delete')}
                         btnDisabled={deleting}
                         changeShow={cancelDelete}
                         submitAction={confirmDelete}
                    />
               </div>
          </>
     );
}