import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import UpdateButton from 'components/partials/UpdateButton';
import { useEffect, useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Role from 'types/Role';
import { toggleModalOpen } from 'utils/common';
import * as yup from 'yup';
import Select, { MultiValue } from 'react-select';

interface IProps {
     show: boolean;
     role: Role | null;
     isLoading?: boolean;
     changeShow: (s: boolean) => void;
     submitAction: (data: Role) => void;
}

export default function ModalConfigUpdate({ show, role, isLoading, changeShow, submitAction }: Readonly<IProps>) {
     const { t } = useTranslation();
     useLayoutEffect(() => toggleModalOpen(show), [show]);

     const schema = yup
          .object({
               name: yup.string().required(t('error.required')).trim(),
          })
          .required();

     const {
          register,
          handleSubmit,
          reset,
          formState: { errors },
     } = useForm<Role>({
          // resolver: yupResolver(schema),
     });

     useEffect(() => {
          if (role && show) {
               reset(role);
          } else {
               reset({
                    name: '',
               });
          }
     }, [role, show, reset]);

     return (
          <>
               <div
                    className={classNames('modal fade text-start modal-primary', { show })}
                    style={{ display: show ? 'block' : 'none' }}
               >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                         <div className="modal-content">
                              <div className="modal-header">
                                   <h5 className="modal-title">
                                        {role ? 'Cập nhật don vi' : 'Thêm mới don vi'}
                                   </h5>
                                   <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => changeShow(false)}
                                        aria-label="Close"
                                   />
                              </div>

                              <form onSubmit={handleSubmit(submitAction)}>
                                   <div className="modal-body">
                                        <div className="row">
                                             <div className="col-12 col-sm-6 mb-3">
                                                  <label className="form-label">
                                                       ten <span className="text-danger">*</span>
                                                  </label>
                                                  <input
                                                       {...register('name')}
                                                       type="text"
                                                       className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                       placeholder="Nhập don vi"
                                                  />
                                                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                                             </div>
                                        </div>
                                   </div>

                                   <div className="modal-footer">
                                        <button
                                             type="button"
                                             className="btn btn-secondary"
                                             onClick={() => changeShow(false)}
                                        >
                                             Hủy
                                        </button>
                                        <button
                                             type="submit"
                                             className="btn btn-primary"
                                             disabled={isLoading}
                                        >
                                             {isLoading ? 'Đang lưu...' : 'Lưu'}
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
               {show && <div className="modal-backdrop fade show" onClick={() => changeShow(false)} />}
          </>
     );
}
