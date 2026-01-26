import { SelectOption, SelectOptionGroup } from 'types/common/Item';

export type FieldType = 'text' | 'select' | 'date' | 'number' | 'hidden' | 'date-range';

export interface SearchFieldBase {
     name: string;
     type: FieldType;
     label?: string;
     wrapClassName?: string;
     show?: boolean;
     value?: string | number;
     placeholder?: string;
}

export interface TextField extends SearchFieldBase {
     type: 'text';
}

export interface SelectField extends SearchFieldBase {
     type: 'select';
     options: {
          multiple: boolean;
          choices: SelectOption[];
          groups?: SelectOptionGroup[];
     };
     onChange?: (value: SelectOption | SelectOption[] | null, fieldName: string) => void;
}

export interface DateField extends SearchFieldBase {
     type: 'date';
}

export interface NumberField extends SearchFieldBase {
     type: 'number';
}

export interface HiddenField extends SearchFieldBase {
     type: 'hidden';
}

export interface DateRangeField extends SearchFieldBase {
     type: 'date-range';
     options?: {
          placeholderText?: string;
          dateFormat?: string;
          isClearable?: boolean;
     };
}

export type SearchField = TextField | SelectField | DateField | NumberField | HiddenField | DateRangeField;
