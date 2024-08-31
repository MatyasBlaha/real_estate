import React from 'react';
import Input from '../../../../ui/forms/Input.tsx';

interface AddressInputGroupProps {
    register: any;
    errors: any;
}

const AddressInputGroup: React.FC<AddressInputGroupProps> = ({ register, errors }) => {
    return (
        <div>
            <Input
                type="text"
                name="city"
                label="City"
                register={register}
                placeholder="Enter city"
                errors={errors}
            />

            <Input
                type="text"
                name="street"
                label="Street"
                register={register}
                placeholder="Enter street"
                errors={errors}
            />

            <Input
                type="text"
                name="postalCode"
                label="Postal Code"
                register={register}
                placeholder="Enter postal code"
                errors={errors}
            />

        </div>
    );
};

export default AddressInputGroup;
