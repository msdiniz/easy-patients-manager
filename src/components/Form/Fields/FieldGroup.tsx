import { useState } from 'react';
import styles from '../PatientForm.module.css'; 

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

const FieldGroup = <T extends { [key: string]: any }>({
  items,
  onChange,
  label,
  options,
  placeholder,
  typeField,
  valueField,
  noteField,
  validateItem,
}: FieldGroupProps<T>) => {
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  const handleItemChange = (index: number, field: keyof T, value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    onChange(updatedItems);
    const error = validateItem(updatedItems[index]);
    setErrors((prevErrors) => ({ ...prevErrors, [index]: error }));
  };

  const handleAddItem = () => {
    const newItem: T = { [valueField]: '', [typeField]: options[0], ...(noteField ? { [noteField]: '' } : {}) } as T;
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    onChange(updatedItems);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[index];
      return newErrors;
    });
  };

  const hasErrors = Object.values(errors).some((error) => error);

  return (
    <div className={styles.formGroupFullWidth} style={{ border: hasErrors ? '1px solid red' : '1px solid lightgray', padding: '10px', borderRadius: '5px' }}>
      <label>{label}</label>
      {items.map((item, index) => (
        <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', marginBottom: '10px' }}>
          <div>
            <input
              type="text"
              value={item[valueField]}
              onChange={(e) => handleItemChange(index, valueField, e.target.value)}
              placeholder={placeholder}
              style={{ width: '100%', borderColor: errors[index] ? 'red' : 'initial' }}
            />
            {errors[index] && <div style={{ color: 'red', fontSize: '12px' }}>{errors[index]}</div>}
          </div>
          <select
            value={item[typeField]}
            onChange={(e) => handleItemChange(index, typeField, e.target.value)}
            style={{ width: '100%' }}
          >
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {noteField && item[typeField] === 'other' && (
            <input
              type="text"
              value={item[noteField] || ''}
              onChange={(e) => handleItemChange(index, noteField, e.target.value)}
              placeholder="Note"
              style={{ width: '100%' }}
            />
          )}
          <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddItem}>Add {label}</button>
    </div>
  );
};

export default FieldGroup;