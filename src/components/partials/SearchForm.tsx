import classNames from 'classnames';
import ResetButton from './ResetButton';
import UpdateButton from 'components/partials/UpdateButton';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from 'react-feather';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Select from 'react-select';
// import { DateRangePicker } from 'rsuite';
// import 'rsuite/DateRangePicker/styles/index.css';
import { SearchField } from 'types/common/Search';
// import { FORMAT_DATE, formatDateTime, isDateValid } from '../../utils/date';
import { SelectOption } from '../../types/common/Item';

interface IProps {
     fields: SearchField[];
     isLoading: boolean;
     searchClass?: string;
     preserveParams?: string[];
}

export default function SearchForm({ fields, isLoading, searchClass = '', preserveParams }: Readonly<IProps>) {
     const [showSearch, setShowSearch] = useState(true);
     const { handleSubmit, reset, control } = useForm<FieldValues>({
          defaultValues: fields.reduce((acc, field) => {
               acc[field.name] = field.type === 'select' ? [] : '';
               return acc;
          }, {} as FieldValues),
     });
     const navigate = useNavigate();
     const location = useLocation();
     const [searchParams] = useSearchParams();
     const [dateRangeValues, setDateRangeValues] = useState<Record<string, [Date, Date] | null>>({});

     useEffect(() => {
          const defaultValues: FieldValues = {};
          const dateDefaults: Record<string, [Date, Date] | null> = {};
          fields.forEach((field) => {
               if (field.type === 'select') {
                    const selectedValue = searchParams.get(field.name);
                    if (selectedValue) {
                         const selectedValues = selectedValue.split(',');
                         if (field.options.groups && field.options.groups.length > 0) {
                              const optionSelected: SelectOption[] = [];
                              field.options.groups.forEach((group) => {
                                   group.options.forEach((option) => {
                                        if (selectedValues.includes(option.value.toString())) {
                                             optionSelected.push(option);
                                        }
                                   });
                              });
                              defaultValues[field.name] = optionSelected;
                         } else {
                              defaultValues[field.name] = field.options.choices.filter((choice) =>
                                   selectedValues.includes(choice.value.toString())
                              );
                         }
                    } else {
                         defaultValues[field.name] = field.options.multiple ? [] : null;
                    }
               } else if (field.type === 'date-range') {
                    const dateRange = searchParams.get(field.name);
                    if (dateRange) {
                         const [start, end] = dateRange.split('-');
                         dateDefaults[field.name] = [new Date(start), new Date(end)];
                    } else {
                         dateDefaults[field.name] = null;
                    }
                    defaultValues[field.name] = dateRange || '';
               } else {
                    defaultValues[field.name] = searchParams.get(field.name) ?? '';
               }
          });
          setDateRangeValues(dateDefaults);
          reset(defaultValues);
     }, [searchParams, fields, reset]);

     const onSubmit = (data: FieldValues) => {
          const newSearchParams = new URLSearchParams(searchParams);
          console.log(data);

          Object.entries(data).forEach(([key, value]) => {
               if (value) {
                    if (Array.isArray(value)) {
                         if (key.includes('.')) {
                              const keySplit = key.split('.');
                              if (data[keySplit[0]]) {
                                   return;
                              }
                         }
                         const stringValue = value.map((item) => item.value).join(',');
                         if (stringValue) {
                              newSearchParams.set(key, stringValue);
                         } else {
                              newSearchParams.delete(key); // Xóa nếu không có giá trị
                         }
                    } else if (typeof value === 'object') {
                         if (value.value) {
                              newSearchParams.set(key, value.value);
                         } else {
                              newSearchParams.delete(key);
                              Object.entries(value).forEach(([keyChild, valueChild]) => {
                                   if (Array.isArray(valueChild)) {
                                        const keySearch = `${key}.${keyChild}`;
                                        const stringValue = valueChild.map((item) => item.value).join(',');
                                        if (stringValue) {
                                             newSearchParams.set(keySearch, stringValue);
                                        } else {
                                             newSearchParams.delete(keySearch);
                                        }
                                   }
                              });
                         }
                    } else {
                         newSearchParams.set(key, value.toString());
                    }
               } else {
                    // ✅ Xóa parameter nếu không có giá trị
                    newSearchParams.delete(key);
               }
          });

          navigate(`${location.pathname}?${newSearchParams.toString()}`);
     };

     const handleReset = () => {
          // Lấy giá trị hiện tại của form
          const currentValues = control._formValues;

          // Tạo object chứa giá trị mới, chỉ giữ lại các trường hidden
          const newValues: FieldValues = {};
          fields.forEach((field) => {
               if (field.type === 'hidden') {
                    newValues[field.name] = currentValues[field.name] || field.value || '';
               } else {
                    newValues[field.name] = field.type === 'select' ? (field.options.multiple ? [] : null) : '';
               }
          });

          // Reset form với giá trị mới
          reset(newValues, { keepDirty: false });

          // Tạo URL mới chỉ với các tham số hidden
          const newSearchParams = new URLSearchParams();
          fields.forEach((field) => {
               if (field.type === 'hidden' && field.value) {
                    newSearchParams.set(field.name, field.value.toString());
               }
          });

          // Giữ lại các params được chỉ định trong preserveParams
          if (preserveParams) {
               preserveParams.forEach((param) => {
                    const value = searchParams.get(param);
                    if (value) {
                         newSearchParams.set(param, value);
                    }
               });
          }

          // Điều hướng đến URL mới
          const queryString = newSearchParams.toString();
          navigate(`${location.pathname}${queryString ? `?${queryString}` : ''}`);
     };

     return (
          <div className="card">
               <div
                    className="card-header cursor-pointer d-flex justify-content-between align-items-start pb-1"
                    onClick={() => setShowSearch((prev) => !prev)}
               >
                    {/* <h4 className="card-title">Tìm kiếm</h4> */}
                    {!showSearch ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
               </div>
               <div className={classNames('card-body', { 'd-none': !showSearch })}>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                         <div className="row">
                              {fields.map((fieldItem) => {
                                   switch (fieldItem.type) {
                                        case 'text':
                                             if (fieldItem.show !== undefined && !fieldItem.show) {
                                                  return null;
                                             }
                                             return (
                                                  <div className={fieldItem.wrapClassName} key={fieldItem.name}>
                                                       <div className="mb-1">
                                                            <div key={fieldItem.name}>
                                                                 <label htmlFor={fieldItem.name} className="form-label">
                                                                      {fieldItem.label}
                                                                 </label>
                                                                 <Controller
                                                                      name={fieldItem.name}
                                                                      control={control}
                                                                      render={({ field }) => (
                                                                           <input
                                                                                type="text"
                                                                                {...field}
                                                                                className="form-control"
                                                                                placeholder={fieldItem.placeholder}
                                                                           />
                                                                      )}
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                             );
                                        case 'select':
                                             if (fieldItem.show !== undefined && !fieldItem.show) {
                                                  return null;
                                             }
                                             return (
                                                  <div className={fieldItem.wrapClassName} key={fieldItem.name}>
                                                       <div className="mb-1">
                                                            <div key={fieldItem.name}>
                                                                 <label htmlFor={fieldItem.name} className="form-label">
                                                                      {fieldItem.label}
                                                                 </label>
                                                                 <Controller
                                                                      name={fieldItem.name}
                                                                      control={control}
                                                                      render={({ field }) => (
                                                                           <Select
                                                                                {...field}
                                                                                options={
                                                                                     fieldItem.options.choices.length > 0
                                                                                          ? fieldItem.options.choices
                                                                                          : (!!fieldItem.options.groups &&
                                                                                               fieldItem.options.groups?.length > 0 &&
                                                                                               fieldItem.options.groups) ||
                                                                                          []
                                                                                }
                                                                                isMulti={fieldItem.options.multiple}
                                                                                onChange={(val) => {
                                                                                     field.onChange(val);
                                                                                     // Gọi callback nếu có
                                                                                     if (fieldItem.onChange) {
                                                                                          fieldItem.onChange(val, fieldItem.name);
                                                                                     }
                                                                                }}
                                                                                value={field.value}
                                                                                isClearable
                                                                                placeholder={fieldItem.placeholder}
                                                                           />
                                                                      )}
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                             );
                                        // case 'hidden':
                                        //      return (
                                        //           <input
                                        //                type="hidden"
                                        //                key={fieldItem.name}
                                        //                name={fieldItem.name}
                                        //                value={fieldItem.value}
                                        //           />
                                        //      );
                                        // case 'date':
                                        //      if (fieldItem.show !== undefined && !fieldItem.show) {
                                        //           return null;
                                        //      }
                                        //      return (
                                        //           <div className={fieldItem.wrapClassName} key={fieldItem.name}>
                                        //                <div className="mb-1">
                                        //                     <label htmlFor={fieldItem.name} className="form-label">
                                        //                          {fieldItem.label}
                                        //                     </label>
                                        //                     <Controller
                                        //                          name={fieldItem.name}
                                        //                          control={control}
                                        //                          render={({ field }) => (
                                        //                               <input type="date" {...field} className="form-control" />
                                        //                          )}
                                        //                     />
                                        //                </div>
                                        //           </div>
                                        //      );
                                        // case 'date-range': {
                                        //      if (fieldItem.show !== undefined && !fieldItem.show) {
                                        //           return null;
                                        //      }
                                        //      return (
                                        //           <div className={fieldItem.wrapClassName} key={fieldItem.name}>
                                        //                <div className="mb-1">
                                        //                     <div key={fieldItem.name}>
                                        //                          {fieldItem.label && (
                                        //                               <label htmlFor={fieldItem.name} className="form-label">
                                        //                                    {fieldItem.label}
                                        //                               </label>
                                        //                          )}
                                        //                          <Controller
                                        //                               name={fieldItem.name}
                                        //                               control={control}
                                        //                               render={({ field: { ...fieldProps } }) => (
                                        //                                    <DateRangePicker
                                        //                                         format="dd/MM/yyyy"
                                        //                                         character=" – "
                                        //                                         className="form-control new-date-range-picker"
                                        //                                         placeholder="dd/mm/yyyy - dd/mm/yyyy"
                                        //                                         onOk={(value) => {
                                        //                                              const startDate =
                                        //                                                   Array.isArray(value) &&
                                        //                                                        value[0] &&
                                        //                                                        isDateValid(value[0])
                                        //                                                        ? formatDateTime(
                                        //                                                             value[0],
                                        //                                                             FORMAT_DATE.DB_DATE_2
                                        //                                                        )
                                        //                                                        : '';
                                        //                                              const endDate =
                                        //                                                   Array.isArray(value) &&
                                        //                                                        value[1] &&
                                        //                                                        isDateValid(value[1])
                                        //                                                        ? formatDateTime(
                                        //                                                             value[1],
                                        //                                                             FORMAT_DATE.DB_DATE_2
                                        //                                                        )
                                        //                                                        : '';
                                        //                                              fieldProps.onChange(`${startDate}-${endDate}`);
                                        //                                              setDateRangeValues((prev) => ({
                                        //                                                   ...prev,
                                        //                                                   [fieldItem.name]: value as [Date, Date],
                                        //                                              }));
                                        //                                         }}
                                        //                                         onChange={(value) => {
                                        //                                              if (value) {
                                        //                                                   const startDate =
                                        //                                                        Array.isArray(value) &&
                                        //                                                             value[0] &&
                                        //                                                             isDateValid(value[0])
                                        //                                                             ? formatDateTime(
                                        //                                                                  value[0],
                                        //                                                                  FORMAT_DATE.DB_DATE_2
                                        //                                                             )
                                        //                                                             : '';
                                        //                                                   const endDate =
                                        //                                                        Array.isArray(value) &&
                                        //                                                             value[1] &&
                                        //                                                             isDateValid(value[1])
                                        //                                                             ? formatDateTime(
                                        //                                                                  value[1],
                                        //                                                                  FORMAT_DATE.DB_DATE_2
                                        //                                                             )
                                        //                                                             : '';
                                        //                                                   if (startDate && endDate)
                                        //                                                        fieldProps.onChange(
                                        //                                                             `${startDate}-${endDate}`
                                        //                                                        );
                                        //                                                   if (value.length === 2)
                                        //                                                        setDateRangeValues((prev) => ({
                                        //                                                             ...prev,
                                        //                                                             [fieldItem.name]: value as [Date, Date],
                                        //                                                        }));
                                        //                                              }
                                        //                                         }}
                                        //                                         onClean={() => {
                                        //                                              setDateRangeValues((prev) => ({
                                        //                                                   ...prev,
                                        //                                                   [fieldItem.name]: null,
                                        //                                              }));
                                        //                                              fieldProps.onChange('');
                                        //                                         }}
                                        //                                         value={dateRangeValues[fieldItem.name] ?? null}
                                        //                                         cleanable={fieldItem.options?.isClearable}
                                        //                                    />
                                        //                               )}
                                        //                          />
                                        //                     </div>
                                        //                </div>
                                        //           </div>
                                        //      );
                                        // }
                                        default:
                                             return null;
                                   }
                              })}
                              <div className={classNames('d-flex justify-content-center', searchClass)}>
                                   <div>
                                        <div></div>
                                        <ResetButton btnText="Đặt lại" isLoading={isLoading} handleReset={handleReset} />
                                   </div>
                                   <div className="ms-1"></div>
                                   <UpdateButton btnText="Tìm kiếm" isLoading={isLoading} hasDivWrap={false} />
                              </div>
                         </div>
                    </form>
               </div>
          </div>
     );
}
