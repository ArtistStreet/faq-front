import { SelectOption } from 'types/common/Item';

export type FieldType = 'text' | 'select' | 'date' | 'number';

export interface SearchFieldBase {
    name: string;
    type: FieldType;
    label: string;
    wrapClassName?: string;
    show?: boolean;
}

export interface TextField extends SearchFieldBase {
    type: 'text';
}

export interface SelectField extends SearchFieldBase {
    type: 'select';
    options: {
        multiple: boolean;
        choices: SelectOption[];
    };
}

export interface DateField extends SearchFieldBase {
    type: 'date';
}

export interface NumberField extends SearchFieldBase {
    type: 'number';
}

export type SearchField = TextField | SelectField | DateField | NumberField;
