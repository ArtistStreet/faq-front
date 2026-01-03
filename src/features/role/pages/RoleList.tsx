import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client/react';
import { useEffect, useState } from 'react';
import { ROLE_CREATE, ROLE_DELETE, ROLE_LIST } from 'services/RoleServices';
import Role, { RoleQuery } from '@/types/Role';
import ListGroup from '../components/ListRole';
import ModalConfirm from '@/components/partials/ModalConfirm';
import { useTranslation } from 'react-i18next';
import { showToast } from '@/utils/common';
// import { Helmet } from 'react-helmet-async';
import ModalGroupUpdate from '../components/ModalRoleUpdate';
import { find } from 'lodash';

export default function RoleList() {
     const [showDelete, setShowDelete] = useState(false);
     const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);
     const [showModal, setShowModal] = useState(false);
     const [currentRole, setCurrentRole] = useState<Role | null>(null);
     const { t } = useTranslation();

     // Load root groups
     const { loading: loadingRoot, data } = useQuery<RoleQuery>(ROLE_LIST);

     const role: Role[] = data?.roleList ?? [];

     const [saveRole, { loading: saving }] = useMutation(ROLE_CREATE, {
          refetchQueries: ['RoleList'], // reload dữ liệu sau khi lưu
          onCompleted: (data) => {
               // const message = currentGroup?.id ? 'Cập nhật thành công!' : 'Tạo nhóm mới thành công!';
               // showToast(true, [message]);
               closeModal();
          },
          onError: (error) => {
               showToast(false, [error.message]);
          },
     });

     const [deleteGroup, { loading: deleting }] = useMutation(ROLE_DELETE, {
          refetchQueries: ['RoleList'], // refetch cả root và children nếu cần
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

     // Hàm mở modal Create
     const handleCreate = () => {
          setShowModal(true);
     };

     // Hàm mở modal Update
     const handleUpdate = (role: Role) => {
          setCurrentRole(role);
          setShowModal(true);
     };

     // Hàm đóng modal
     const closeModal = () => {
          setShowModal(false);
     };

     const handleSubmit = async (formData: { name: string; description?: string }) => {
          const variables = currentRole?.id
               ? { id: currentRole.id, ...formData } // update
               : formData; // create

          await saveRole({ variables });
     };

     const handleDelete = (id: number) => {
          setItemIdToDelete(id);
          setShowDelete(true);
     };

     const confirmDelete = async () => {
          if (!itemIdToDelete) return;

          await deleteGroup({ variables: { id: itemIdToDelete } });
     };

     // Hủy xóa
     const cancelDelete = () => {
          setShowDelete(false);
          setItemIdToDelete(null);
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

                    <div className="card shadow-sm">
                         <div className="card-body">
                              {role.length === 0 ? (
                                   <p className="text-muted text-center py-4">Không có nhóm con nào.</p>
                              ) : (
                                   <ListGroup
                                        items={role}
                                        handleDelete={handleDelete}
                                   // handleUpdate={handleUpdate}
                                   />
                              )}
                         </div>
                    </div>
                    <ModalGroupUpdate
                         show={showModal}
                         role={currentRole} // null = create, có data = update
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