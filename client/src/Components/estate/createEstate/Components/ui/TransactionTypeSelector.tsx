import React from "react";
import SelectInput from "../../../../ui/forms/SelectInupt.tsx";

interface TransactionTypeSelectProps {
    register: any;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TransactionTypeSelector: React.FC<TransactionTypeSelectProps> = ({ register, onChange }) => {
    const propertyTransactionObject = [
        { value: 'sell', label: 'sell' },
        { value: 'rent', label: 'rent' },
    ];

    return (
        <SelectInput
            label="Choose transaction"
            name="propertyTransaction"
            placeholder="Select a transaction type"
            options={propertyTransactionObject}
            register={register}
            required={true}
            onChange={onChange}
        />
    );
};

export default TransactionTypeSelector;