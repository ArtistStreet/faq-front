import { TFunction } from 'i18next';
import { find, get, isEmpty } from 'lodash';
import { toast, ToastOptions } from 'react-toastify';
import { ItemParam, SelectOption } from 'types/common/Item';
import { DataList, Paging } from '../types/common';
import { JSX } from 'react';

export const showToast = (success: boolean, messages?: string[]) => {
     const options: ToastOptions<{}> = {
          position: 'top-right',
          toastId: Math.random(),
     };
     let MsgNode = null;
     if (messages && messages.length > 1) {
          MsgNode = (
               <div>
                    {messages.map((message: string, index: number) => (
                         <p key={index}>{message}</p>
                    ))}
               </div>
          );
     }
     if (success) {
          if (!isEmpty(messages)) {
               if (messages!.length === 1) {
                    toast.success(messages![0], options);
               } else {
                    toast.success(MsgNode, options);
               }
          }
     } else {
          if (!isEmpty(messages)) {
               if (messages!.length === 1) {
                    toast.error(messages![0], options);
               } else {
                    toast.error(MsgNode, options);
               }
          }
     }
};

export const genTableIndex = (index: number, limit: number, currentPage: number) =>
     index + limit * (currentPage - 1) + 1;

export const getFieldHtml = (fields: ItemParam[], id: number, t: TFunction<'translation', undefined>) => {
     const item = find(fields, { id }) as ItemParam;
     if (item) {
          return <span className={item.className}>{t(`constants.${item.name}`)}</span>;
     }
     return <></>;
};

export const getFieldInArrayObject = (
     listObj: {}[],
     id: number | string,
     fieldName: string = 'name',
     defaultValue: string = '',
     fieldCompare = 'id'
) => get(find(listObj, { [fieldCompare]: id }), fieldName, defaultValue);

export const toggleModalOpen = (show: boolean) => {
     if (show) {
          document.body.classList.add('modal-open');
     } else {
          document.body.classList.remove('modal-open');
     }
};

export const selectItem = (listItems: ItemParam[], t: TFunction<'translation', undefined>, noNoneOption?: boolean) => {
     const selectOptions: JSX.Element[] = [];
     if (!noNoneOption) {
          selectOptions.push(
               <option key={0} value={0}>
                    --
               </option>
          );
     }
     listItems.forEach((item) => {
          selectOptions.push(
               <option key={item.id} value={item.id}>
                    {t(`constants.${item.name}`)}
               </option>
          );
     });
     return selectOptions;
};

export const convertConstantToSelectOptions = (
     items: ItemParam[],
     t: TFunction<'translation', undefined>,
     noNoneOption?: boolean
) => {
     const selectOptions: SelectOption[] = [];
     if (!noNoneOption) {
          selectOptions.push({
               value: 0,
               label: '',
          });
     }
     items.forEach((item) => {
          selectOptions.push({
               value: item.id,
               label: t(`constants.${item.name}`),
          });
     });
     return selectOptions;
};

// tslint:disable-next-line
export const getSelectStyle = (baseStyles: any, state: any, isError: boolean) => ({
     ...baseStyles,
     borderColor: state.isFocused ? (isError ? '#ea5455' : baseStyles.borderColor) : isError ? '#ea5455' : '#d8d6de',
     boxShadow: 'none',
});

export const isValidImageFile = (file: File) => {
     const validImageTypes = [
          'image/png',
          'image/jpg',
          'image/jpeg',
          'image/gif',
          'image/webp',
          'image/bmp',
          'image/svg+xml',
     ];
     return file && validImageTypes.includes(file.type);
};

/* tslint:disable:no-any */
export function flattenObject(obj: any, prefix = ''): Record<string, any> {
     return Object.keys(obj).reduce((acc, k) => {
          const pre = prefix.length ? prefix + '.' : '';
          if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
               Object.assign(acc, flattenObject(obj[k], pre + k));
          } else {
               acc[pre + k] = obj[k];
          }
          return acc;
     }, {} as Record<string, any>);
}

export const convertPaging = <T, K extends { page?: string; limit?: string }>(
     data: DataList<T>,
     limit: number
): Paging => ({
     count_item: data.totalCount,
     total_page: data.totalPages,
     current_page: data.currentPage, // Number(paramConfig.page),
     limit,
});

export const generateFilters = (params: any, filterConfig: any) => {
     const filters = [];
     for (const paramKey of Object.keys(params)) {
          const value = params[paramKey];
          const config = filterConfig[paramKey];

          if (config && value) {
               const { key, operator } = config;
               filters.push(`${key}:${operator}(${value})`);
          }
     }
     return filters;
};

/**
 * Chuyển đổi mảng dữ liệu thành định dạng options cho react-select
 * @param data Mảng dữ liệu cần chuyển đổi
 * @param valueField Tên trường làm giá trị (mặc định là 'id')
 * @param labelField Tên trường làm nhãn hiển thị (mặc định là 'name')
 * @param formatLabel Hàm tùy chỉnh để định dạng nhãn (tùy chọn)
 * @param defaultOption Tùy chọn thêm giá trị mặc định vào đầu danh sách
 * @returns Mảng các đối tượng SelectOption
 */
export const convertDataToSelectOptions = <T extends Record<string, any>>(
     data: T[],
     valueField: keyof T = 'id' as keyof T,
     labelField: keyof T = 'name' as keyof T,
     formatLabel?: (item: T) => string,
     defaultOption?: { value: number; label: string } | null
): SelectOption[] => {
     const selectOptions: SelectOption[] = [];

     // Thêm tùy chọn mặc định nếu được cung cấp
     if (defaultOption !== null) {
          selectOptions.push(
               defaultOption || {
                    value: 0,
                    label: '',
               }
          );
     }

     // Chuyển đổi mỗi item trong mảng dữ liệu thành SelectOption
     data.forEach((item) => {
          const value = Number(item[valueField]) || 0;
          const label = formatLabel ? formatLabel(item) : String(item[labelField] || '');

          selectOptions.push({
               value,
               label,
          });
     });

     return selectOptions;
};
