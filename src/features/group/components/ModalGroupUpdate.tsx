import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import UpdateButton from 'components/partials/UpdateButton';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Group from 'types/Group';
import { toggleModalOpen } from 'utils/common';
import * as yup from 'yup';
import Select, { MultiValue } from 'react-select';
import { SelectOption } from '@/types/common/Item';
import Role from '@/types/Role';

interface IProps {
     show: boolean;
     group: Group | null;
     role: Role[];
     isLoading?: boolean;
     changeShow: (s: boolean) => void;
     submitAction: (data: Group) => void;
}

export default function ModalGroupUpdate({ show, group, role, isLoading, changeShow, submitAction }: Readonly<IProps>) {
     const { t } = useTranslation();
     useLayoutEffect(() => toggleModalOpen(show), [show]);
     const [roleValue, setRoleValue] = useState<SelectOption[]>([]);

     const schema = yup
          .object({
               name: yup.string().required(t('error.required')).trim(),
               description: yup.string().required(t('error.required')).trim(),
          })
          .required();

     const {
          register,
          handleSubmit,
          reset,
          setValue,
          formState: { errors },
     } = useForm<Group>({
          // resolver: yupResolver(schema),
     });

     useEffect(() => {
          if (group && show) {
               reset(group);
          } else {
               reset({
                    name: '',
                    description: '',
               });
          }
     }, [group, show, reset]);

     const onChangeRole = (value: MultiValue<SelectOption>) => {
          setRoleValue([...value]);
          setValue(
               'roleIds',
               value.map((item) => item.value)
          );
     };

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
                                        {group ? 'Cập nhật cấu hình' : 'Thêm mới cấu hình'}
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
                                                       Loai <span className="text-danger">*</span>
                                                  </label>
                                                  <Select
                                                       options={role.map((item) => ({
                                                            value: item.id!,
                                                            label: item.name,
                                                       }))}
                                                       isMulti={true}
                                                       onChange={onChangeRole}
                                                       value={roleValue}
                                                       isClearable
                                                       placeholder="Chọn..."
                                                  />
                                                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                                             </div>
                                             <div className="col-12 col-sm-6 mb-3">
                                                  <label className="form-label">
                                                       ten <span className="text-danger">*</span>
                                                  </label>
                                                  <input
                                                       {...register('name')}
                                                       type="text"
                                                       className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                       placeholder="Nhập mã"
                                                  />
                                                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                                             </div>

                                             <div className="col-12 mb-3">
                                                  <label className="form-label">
                                                       mo ta <span className="text-danger">*</span>
                                                  </label>
                                                  <textarea
                                                       {...register('description')}
                                                       className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                                       rows={4}
                                                       placeholder="Nhập nội dung"
                                                  />
                                                  {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
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
