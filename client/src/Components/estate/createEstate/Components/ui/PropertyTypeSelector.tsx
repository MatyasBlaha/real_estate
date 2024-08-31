import React from 'react';
import SelectInput from '../../../../ui/forms/SelectInupt.tsx';

interface PropertyTypeSelectProps {
    register: any;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PropertyTypeSelect: React.FC<PropertyTypeSelectProps> = ({ register, onChange }) => {

    const propertyTypeOption = [
        { value: 'apartment', label: 'apartment' },
        { value: 'house', label: 'house' },
        { value: 'land', label: 'land' },
    ];

    return (
        <SelectInput
            label="Choose property"
            name="propertyType"
            placeholder="Select a property type"
            options={propertyTypeOption}
            register={register}
            required={true}
            onChange={onChange}
        />
    );
};

export default PropertyTypeSelect;