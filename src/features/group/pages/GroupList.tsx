// src/pages/GroupTreePage.tsx (hoặc tên bạn thích)
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { GET_ROOT_GROUPS, GET_GROUP_CHILDREN, GROUP_DELETE, GROUP_CREATE, GROUP_UPDATE } from 'services/GroupServices';
import { FAQ_CREATE, FAQ_DELETE, FAQ_LIST, FAQ_UPDATE } from 'services/FAQServices';
import Group, { ChildrenData, RootGroupsData } from '@/types/Group';
import ListGroup from '../components/ListGroups';
import ModalConfirm from '@/components/partials/ModalConfirm';
import { useTranslation } from 'react-i18next';
// import { showToast } from '@/utils/common';
// import { Helmet } from 'react-helmet-async';
import ModalGroupUpdate from '../components/ModalGroupUpdate';
import { find } from 'lodash';
import { ROLE_LIST } from '@/services/RoleServices';
// import Role, { RoleQuery } from '@/types/Role';
import Faq, { FaqQuery } from '@/types/Faq';
import Tab from '@/components/partials/Tab';
import ListFAQ from '../../faq/components/ListFAQ';
import ModalFaqUpdate from '../../faq/components/ModalFaqUpdate';
import { useRef } from 'react';
import SearchForm from '@/components/partials/SearchForm';
import { convertConstantToSelectOptions } from '@/utils/common';
import { Role, RoleName } from '@/types/common/Item';
import { showToast } from '@/utils/common';
import Pagination from '@/components/partials/Pagination';

export default function GroupTreePage() {
     const [showDelete, setShowDelete] = useState(false);
     const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);
     const [showModal, setShowModal] = useState(false);
     const [showFaqModal, setShowFaqModal] = useState(false);
     const [currentGroup, setCurrentGroup] = useState<Group | null>(null);
     const { t } = useTranslation();
     const [page, setPage] = useState(1);
     const limit = 5; // có thể để user chọn

     const { '*': path } = useParams<{ '*': string }>(); // lấy toàn bộ phần sau /groups/
     const pathIds = path ? path.split('/').map(Number) : [];

     const [searchParams] = useSearchParams();

     const searchTerm = searchParams.get('search') || '';
     const roleIds = searchParams.get('role')
          ? searchParams.get('role')!.split(',').map(Number)
          : [];

     const filters =
          roleIds.length > 0
               ? [`role:[](${roleIds.join(',')})`]
               : null;

     // Load root groups
     const { loading: loadingRoot, data: rootData, refetch } = useQuery<RootGroupsData>(GET_ROOT_GROUPS, {
          variables: {
               search: searchTerm || null,
               filters,
               page,
               limit,
          },
     });

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

     const roleNumberToEnum = (role: number) => {
          switch (role) {
               case Role.MANAGER:
                    return 'MANAGER';
               case Role.OFFICER:
                    return 'OFFICER';
               case Role.PRESIDENT:
                    return 'PRESIDENT';
               default:
                    return null;
          }
     };

     // Hàm submit từ modal (create hoặc update)
     const handleSubmit = async (formData: {
          name: string;
          description?: string;
          parent_id?: number | null;
          role: Role
     }) => {

          // Tự động lấy parent_id từ URL nếu không có trong form
          const autoParentId = pathIds.length > 0 ? pathIds[pathIds.length - 1] : null;

          const finalData = {
               name: formData.name,
               description: formData.description,
               parent_id: formData.parent_id ?? autoParentId,
               role: roleNumberToEnum(formData.role),
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
     const [loadChildren] = useLazyQuery<ChildrenData>(GET_GROUP_CHILDREN);

     const group: Group[] = rootData?.rootGroups.data ?? [];

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

     const total = rootData?.rootGroups.totalCount || 0;

     const [treeData, setTreeData] = useState<Group[]>([]);
     useEffect(() => {
          if (rootData?.rootGroups?.data) {
               setTreeData(rootData.rootGroups.data);
          }
     }, [rootData]);
     const updateNode = (
          nodes: Group[],
          id: number | undefined,
          updater: (node: Group) => Group
     ): Group[] =>
          nodes.map(n => {
               if (n.id === id) return updater(n);
               if (n.children)
                    return { ...n, children: updateNode(n.children, id, updater) };
               return n;
          });

     const handleToggleNode = async (node: Group) => {
          // Nếu không có children → bỏ qua
          if (!node.hasChildren) return;

          setTreeData(prev =>
               updateNode(prev, node.id, n => ({
                    ...n,
                    isOpen: !n.isOpen,
               }))
          );

          // Đã load rồi → chỉ toggle
          if (node.children?.length) return;

          // Chưa load → gọi API
          setTreeData(prev =>
               updateNode(prev, node.id, n => ({ ...n, isLoading: true }))
          );

          const res = await loadChildren({
               variables: {
                    id: node.id,
                    page: 1,
                    limit: 10,
               },
          });

          setTreeData(prev =>
               updateNode(prev, node.id, n => ({
                    ...n,
                    isOpen: true,
                    isLoading: false,
                    children: res.data?.groupChildren.data,
               }))
          );
     };


     return (
          <>
               <div className="container py-4">
                    <SearchForm
                         fields={[
                              { name: 'search', type: 'text', label: 'Từ khóa', wrapClassName: 'col-md-4 col-12' },
                              {
                                   name: 'role',
                                   type: 'select',
                                   label: 'Trạng thái',
                                   wrapClassName: 'col-md-4 col-12',
                                   options: {
                                        multiple: true,
                                        choices: convertConstantToSelectOptions(RoleName, t, true),
                                   },
                              },
                         ]}
                         isLoading={loadingRoot}
                         searchClass="col-md-4 pt-2"
                    />

                    <div className="card shadow-sm">
                         <div className="card-body">
                              {group.length === 0 ? (
                                   <p className="text-muted text-center py-4">Không có nhóm con nào.</p>
                              ) : (
                                   <Tab
                                        // faq={
                                        //      <ListFAQ
                                        //           items={faq}
                                        //           handleDelete={handleDelete}
                                        //           role={role}
                                        //           // handleUpdate={handleUpdate}
                                        //           handleCreateFaq={handleCreateFaq}
                                        //      />
                                        // }
                                        group={
                                             <ListGroup
                                                  items={treeData}
                                                  page={page}
                                                  limit={limit}
                                                  handleDelete={handleDelete}
                                                  handleUpdate={handleUpdate}
                                                  onToggle={handleToggleNode}
                                             />

                                        }
                                   >
                                   </Tab>
                              )}
                         </div>
                         <div className="text-end border-0">
                              <button className="btn btn-primary" onClick={handleCreate}>
                                   Thêm
                              </button>
                         </div>
                         <Pagination limit={limit} total={total} page={page} setPage={setPage} />
                    </div>
                    <ModalGroupUpdate
                         show={showModal}
                         group={currentGroup} // null = create, có data = update
                         isLoading={saving}
                         changeShow={closeModal}
                         submitAction={handleSubmit}
                    />
                    {/* <ModalFaqUpdate
                         show={showFaqModal}
                         faq={currentFaq} // null = create, có data = update
                         role={role}
                         isLoading={saving}
                         changeShow={closeFaqModal}
                         submitAction={handleSubmitFaq}
                    /> */}
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