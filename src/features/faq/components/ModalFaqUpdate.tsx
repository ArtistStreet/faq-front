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
import Role from '@/types/Role';
import Category from '@/types/Category';

interface IProps {
     show: boolean;
     faq: Faq | null;
     category: Category[] | undefined;
     isLoading?: boolean;
     changeShow: (s: boolean) => void;
     submitAction: (data: FaqFormInput) => void;
}

export default function ModalFaqUpdate({ show, faq, category, isLoading, changeShow, submitAction }: Readonly<IProps>) {
     const { t } = useTranslation();
     useLayoutEffect(() => toggleModalOpen(show), [show]);
     const [faqValue, setFaqValue] = useState<SelectOption[]>([]);

     const schema = yup
          .object({
               answer: yup.string().required(t('error.required')).trim(),
               question: yup.string().required(t('error.required')).trim(),
               categoryIds: yup.array().required(t('error.required')).min(1, t('error.required')),
          })
          .required();

     const {
          register,
          handleSubmit,
          reset,
          setValue,
          formState: { errors },
     } = useForm<FaqFormInput>({
          resolver: yupResolver(schema),
     });

     useEffect(() => {
          if (faq && show) {
               reset({
                    answer: faq.answer ?? '',
                    question: faq.question ?? '',
                    categoryIds: faq.categoryIds ?? [],
               });
               setFaqValue(
                    (faq.categoryIds ?? []).map((id) => {
                         const matched = category?.find((r) => r.id === id);
                         return { value: id, label: matched ? matched.name : String(id) };
                    })
               );
          } else {
               reset({
                    answer: '',
                    question: '',
                    categoryIds: [],
               });
               setFaqValue([]);
          }
     }, [faq, show, reset]);

     const onChangeRole = (value: MultiValue<SelectOption>) => {
          setFaqValue([...value]);
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
                                        {faq ? 'Cập nhật cấu hình' : 'Thêm mới cấu hình'}
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
                                                       Loại câu hỏi <span className="text-danger">*</span>
                                                  </label>
                                                  <Select
                                                       options={category?.map((item) => ({
                                                            value: item.id!,
                                                            label: item.name,
                                                       }))}
                                                       isMulti={true}
                                                       onChange={onChangeRole}
                                                       value={faqValue}
                                                       isClearable
                                                       placeholder="Chọn..."
                                                  />
                                                  {errors.categoryIds && <div className="invalid-feedback">{errors.categoryIds.message}</div>}
                                             </div>
                                             <div className="col-12 col-sm-6 mb-3">
                                                  <label className="form-label">
                                                       Câu hỏi <span className="text-danger">*</span>
                                                  </label>
                                                  <input
                                                       {...register('answer')}
                                                       type="text"
                                                       className={`form-control ${errors.answer ? 'is-invalid' : ''}`}
                                                       placeholder="Nhập mã"
                                                  />
                                                  {errors.answer && <div className="invalid-feedback">{errors.answer.message}</div>}
                                             </div>

                                             <div className="col-12 mb-3">
                                                  <label className="form-label">
                                                       Câu trả lời <span className="text-danger">*</span>
                                                  </label>
                                                  <textarea
                                                       {...register('question')}
                                                       className={`form-control ${errors.question ? 'is-invalid' : ''}`}
                                                       rows={4}
                                                       placeholder="Nhập nội dung"
                                                  />
                                                  {errors.question && <div className="invalid-feedback">{errors.question.message}</div>}
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
