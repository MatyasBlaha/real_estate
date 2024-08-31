import React from 'react';
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";

interface SelectInputProps {
    label: string;
    name: string;
    placeholder?: string;
    options: { value: string; label: string }[];
    register?: any; // Make register optional
    required?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
                                                     label,
                                                     name,
                                                     placeholder = '',
                                                     options,
                                                     register,
                                                     required = true,
                                                     onChange
                                                 }) => {
    return (
        <FormGroup>
            <FormLabel>{label}</FormLabel>
            <FormControl
                as="select"
                placeholder={placeholder}
                {...(register ? register(name, { required }) : {})} // Conditionally apply register
                onChange={onChange}
            >
                <option value="">{placeholder || `Select a ${label.toLowerCase()}`}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </FormControl>
        </FormGroup>
    );
};

export default SelectInput;
