interface FieldGroupProps<T> {
    items: T[];
    onChange: (items: T[]) => void;
    label: string;
    options: string[];
    placeholder: string;
    typeField: keyof T;
    valueField: keyof T;
    noteField?: keyof T;
    validateItem: (item: T) => string;
}
declare const FieldGroup: <T extends {
    [key: string]: any;
}>({ items, onChange, label, options, placeholder, typeField, valueField, noteField, validateItem, }: FieldGroupProps<T>) => import("react/jsx-runtime").JSX.Element;
export default FieldGroup;
