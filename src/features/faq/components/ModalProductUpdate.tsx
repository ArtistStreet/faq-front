import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import UpdateButton from 'components/partials/UpdateButton';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Faq, { FaqFormInput } from 'types/Faq';
import { toggleModalOpen } from 'utils/common';
import * as yup from 'yup';
import Select, { MultiValue } from 'react-select';
import { SelectOption } from '@/types/common/Item';
import Product, { CreateProductInput } from '@/types/Product';
import Category from '@/types/Category';

interface IProps {
     show: boolean;
     product: Product | null;
     categoryIds: Category[] | undefined;
     isLoading?: boolean;
     changeShow: (s: boolean) => void;
     submitAction: (data: Product) => void;
}

export default function ModalProductUpdate({ show, product, categoryIds, isLoading, changeShow, submitAction }: Readonly<IProps>) {
     useLayoutEffect(() => toggleModalOpen(show), [show]);
     const [value, setCategoryValue] = useState<SelectOption[]>([]);

     const schema = yup.object({
          name: yup.string().required().trim(),
          desc: yup.string().nullable().optional(),
          price: yup.number().required().positive(),
          stock: yup.number().required().positive(),
          categoryIds: yup.array().of(yup.number()).min(1).required(),
          status: yup.number().optional(),
     });

     const {
          register,
          handleSubmit,
          reset,
          setValue,
          formState: { errors },
     } = useForm<CreateProductInput>({
          resolver: yupResolver(schema),
     });

     useEffect(() => {
          if (product && show) {
               reset({
                    name: product.name ?? '',
                    desc: product.desc ?? '',
                    price: product.price ?? 0,
                    stock: product.stock ?? 0,
                    categoryIds: product.categoryIds ?? [],
                    // status: product.status,
               });
               setCategoryValue(
                    (product.category ?? []).map((cat) => ({
                         value: cat.id!,
                         label: cat.name,
                    }))
               );
          } else {
               reset({
                    name: '',
                    desc: '',
                    price: 0,
                    stock: 0,
                    categoryIds: [],
               });
               setCategoryValue([]);
          }
     }, [product, show, reset]);

     const onChangeRole = (value: MultiValue<SelectOption>) => {
          setCategoryValue([...value]);
          setValue(
               'categoryIds',
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
                                        {product ? 'Cập nhật cấu hình' : 'Thêm mới cấu hình'}
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
                                                       danh muc <span className="text-danger">*</span>
                                                  </label>
                                                  <Select
                                                       options={categoryIds?.map((item) => ({
                                                            value: item.id!,
                                                            label: item.name,
                                                       }))}
                                                       isMulti={true}
                                                       onChange={onChangeRole}
                                                       value={value}
                                                       isClearable
                                                       placeholder="Chọn..."
                                                  />
                                                  {errors.categoryIds && <div className="invalid-feedback">{errors.categoryIds.message}</div>}
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
                                             <div className="col-12 col-sm-6 mb-3">
                                                  <label className="form-label">
                                                       mo ta <span className="text-danger">*</span>
                                                  </label>
                                                  <input
                                                       {...register('desc')}
                                                       type="text"
                                                       className={`form-control ${errors.desc ? 'is-invalid' : ''}`}
                                                       placeholder="Nhập mô tả"
                                                  />
                                                  {errors.desc && <div className="invalid-feedback">{errors.desc.message}</div>}
                                             </div>

                                             <div className="col-12 mb-3">
                                                  <label className="form-label">
                                                       gia <span className="text-danger">*</span>
                                                  </label>
                                                  <textarea
                                                       {...register('price')}
                                                       className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                                       rows={4}
                                                       placeholder="Nhập nội dung"
                                                  />
                                                  {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
                                             </div>

                                             <div className="col-12 mb-3">
                                                  <label className="form-label">
                                                       so luong <span className="text-danger">*</span>
                                                  </label>
                                                  <textarea
                                                       {...register('stock')}
                                                       className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                                                       rows={4}
                                                       placeholder="Nhập nội dung"
                                                  />
                                                  {errors.stock && <div className="invalid-feedback">{errors.stock.message}</div>}
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
