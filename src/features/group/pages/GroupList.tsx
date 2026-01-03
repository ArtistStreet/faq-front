// src/pages/GroupTreePage.tsx (hoặc tên bạn thích)
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { GET_ROOT_GROUPS, GET_GROUP_CHILDREN, GROUP_DELETE, GROUP_CREATE, GROUP_UPDATE } from 'services/GroupServices';
import { FAQ_CREATE, FAQ_DELETE, FAQ_LIST, FAQ_UPDATE } from 'services/FAQServices';
import Group, { ChildrenData, RootGroupsData } from '@/types/Group';
import ListGroup from '../components/ListGroups';
import ModalConfirm from '@/components/partials/ModalConfirm';
import { useTranslation } from 'react-i18next';
import { showToast } from '@/utils/common';
// import { Helmet } from 'react-helmet-async';
import ModalGroupUpdate from '../components/ModalGroupUpdate';
import { find } from 'lodash';
import { ROLE_LIST } from '@/services/RoleServices';
import Role, { RoleQuery } from '@/types/Role';
import Faq, { FaqQuery } from '@/types/Faq';
import Tab from '@/components/partials/Tab';
import ListFAQ from '../components/ListFAQ';

export default function GroupTreePage() {
     const [showDelete, setShowDelete] = useState(false);
     const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);
     const [showModal, setShowModal] = useState(false);
     const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
     const [currentFaq, setCurrentFaq] = useState<Faq | null>(null);
     const { t } = useTranslation();

     const navigate = useNavigate();
     const { '*': path } = useParams<{ '*': string }>(); // lấy toàn bộ phần sau /groups/
     const pathIds = path ? path.split('/').map(Number) : [];

     // Load root groups
     const { loading: loadingRoot, data: rootData } = useQuery<RootGroupsData>(GET_ROOT_GROUPS);

     const [deleteGroup, { loading: deleting }] = useMutation(GROUP_DELETE, {
          refetchQueries: ['GetRootGroups', 'GetGroupChildren'], // refetch cả root và children nếu cần
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

     const [saveGroup, { loading: saving }] = useMutation(currentGroup?.id ? GROUP_UPDATE : GROUP_CREATE, {
          refetchQueries: ['GetRootGroups', 'GetGroupChildren'], // reload dữ liệu sau khi lưu
          onCompleted: (data) => {
               const message = currentGroup?.id ? 'Cập nhật thành công!' : 'Tạo nhóm mới thành công!';
               showToast(true, [message]);
               closeModal();
          },
          onError: (error) => {
               showToast(false, [error.message]);
          },
     });

     const { loading: loadingFaq, data: faqData } = useQuery<FaqQuery>(FAQ_LIST);

     const [deleteFaq, { loading: deletingFaq }] = useMutation(FAQ_DELETE, {
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

     const [saveFaq, { loading: savingFaq }] = useMutation(currentFaq?.id ? FAQ_UPDATE : FAQ_CREATE, {
          refetchQueries: ['FAQList'], // reload dữ liệu sau khi lưu
          onCompleted: (data) => {
               const message = currentGroup?.id ? 'Cập nhật thành công!' : 'Tạo nhóm mới thành công!';
               showToast(true, [message]);
               closeModal();
          },
          onError: (error) => {
               showToast(false, [error.message]);
          },
     });

     const faq: Faq[] = faqData?.faqList?.filter((i) => {
          const autoParentId = pathIds.length > 0 ? pathIds[pathIds.length - 1] : null;

          return i.group_id === autoParentId;
     }) ?? [];

     const { loading, data } = useQuery<RoleQuery>(ROLE_LIST);

     const role: Role[] = data?.roleList ?? [];

     // Hàm mở modal Create
     const handleCreate = () => {
          setCurrentGroup(null); // null nghĩa là tạo mới
          setShowModal(true);
     };

     // Hàm mở modal Update
     const handleUpdate = (group: Group) => {
          setCurrentGroup(group);
          setShowModal(true);
     };

     // Hàm đóng modal
     const closeModal = () => {
          setShowModal(false);
          setCurrentGroup(null);
     };

     // Hàm submit từ modal (create hoặc update)
     const handleSubmit = async (formData: {
          name: string;
          description?: string;
          parent_id?: number | null;
          roleIds?: number[]
     }) => {
          // Tự động lấy parent_id từ URL nếu không có trong form
          const autoParentId = pathIds.length > 0 ? pathIds[pathIds.length - 1] : null;

          const finalData = {
               name: formData.name,
               description: formData.description,
               parent_id: formData.parent_id ?? autoParentId,
               roleIds: formData.roleIds,
          };

          const variables = currentGroup?.id
               ? {
                    id: currentGroup.id,
                    input: finalData, // ← Update: gói vào input
               }
               : {
                    input: finalData, // ← Create: gói vào input (bắt buộc vì mutation có $input!)
               };
          await saveGroup({ variables });
     };

     // Lazy load children theo parentId
     const [loadChildren, { loading: loadingChildren, data: childrenData }] = useLazyQuery<ChildrenData>(GET_GROUP_CHILDREN);

     // Khi path thay đổi → load children tương ứng (nếu có)
     useEffect(() => {
          if (pathIds.length > 0) {
               const lastId = pathIds[pathIds.length - 1];
               loadChildren({ variables: { parentId: lastId } });
          }
     }, [pathIds, loadChildren]);

     // if (loadingRoot) return <p className="text-center py-5">Đang tải nhóm gốc...</p>;

     // Danh sách hiển thị hiện tại
     let group: Group[] = [];

     // Breadcrumb
     const breadcrumb = pathIds.map((id, index) => {
          // Tìm group tương ứng với id trong allGroups
          group = rootData?.rootGroups ?? [];

          const g = group.find(g => g.id === id);

          const partialPath = pathIds.slice(0, index + 1).join('/');
          return (
               <span key={id}>
                    {index > 0 && ' > '}
                    <Link to={`/groups/${partialPath}`}>
                         {`${g?.roles.map(i => i.name).join(', ')} ${g?.name}` || `Group ${id}`}  {/* Nếu không tìm thấy → hiển thị fallback */}
                    </Link>
               </span>
          );
     });

     if (pathIds.length === 0) {
          // Trang gốc
          group = rootData?.rootGroups ?? [];
     } else {
          // Trang con
          group = childrenData?.groupChildren ?? [];
          if (loadingChildren) return <p className="text-center py-5">Đang tải nhóm con...</p>;
     }

     const handleDelete = (id: number) => {
          setItemIdToDelete(id);
          setShowDelete(true);
     };

     // Hàm thực hiện xóa khi người dùng bấm "Đồng ý" trong modal
     const confirmDelete = async () => {
          if (!itemIdToDelete) return;

          await deleteGroup({ variables: { id: itemIdToDelete } });
          // onCompleted và onError sẽ xử lý thông báo + đóng modal
     };

     // Hủy xóa
     const cancelDelete = () => {
          setShowDelete(false);
          setItemIdToDelete(null);
     };

     const handleClickGroup = (id: number) => {
          const newPath = path ? `${path}/${id}` : `${id}`;
          navigate(`/groups/${newPath}`);
     };

     return (
          <>
               {/* <Helmet>
                    <title>Cấu hình website</title>
               </Helmet> */}
               <div className="container py-4">
                    <button className="btn btn-primary mb-3" onClick={handleCreate}>
                         Thêm
                    </button>

                    {/* Trong bảng - nút sửa */}
                    {/* <button
                         onClick={() => handleUpdate(item)}
                         className="btn btn-icon btn-sm btn-warning me-2"
                    >
                         <Edit size={14} />
                    </button> */}
                    {/* Breadcrumb */}
                    {pathIds.length > 0 && (
                         <nav className="mb-4">
                              <Link to="/groups" className="text-decoration-none me-2">Nhóm gốc</Link>
                              {breadcrumb}
                         </nav>
                    )}

                    <div className="card shadow-sm">
                         {/* <div className="card-header bg-primary text-white">
                              <h5 className="mb-0">
                                   {pathIds.length === 0 ? 'Tất cả nhóm gốc' : `Nhóm con (ID: ${pathIds[pathIds.length - 1]})`}
                                   <span className="badge bg-light text-dark ms-3">{group.length} nhóm</span>
                              </h5>
                         </div> */}
                         <div className="card-body">
                              {group.length === 0 ? (
                                   <p className="text-muted text-center py-4">Không có nhóm con nào.</p>
                              ) : (
                                   <Tab
                                        faq={
                                             <ListFAQ
                                                  items={faq}
                                                  handleDelete={handleDelete}
                                                  role={role}
                                             // handleUpdate={handleUpdate}
                                             // handleClickGroup={handleClickGroup}
                                             />
                                        }
                                        group={
                                             <ListGroup
                                                  items={group}
                                                  handleDelete={handleDelete}
                                                  role={role}
                                                  handleUpdate={handleUpdate}
                                                  handleClickGroup={handleClickGroup}
                                             />

                                        }
                                   >
                                   </Tab>
                              )}
                         </div>
                    </div>
                    <ModalGroupUpdate
                         show={showModal}
                         group={currentGroup} // null = create, có data = update
                         role={role}
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