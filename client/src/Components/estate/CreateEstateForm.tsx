import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import PropertyTypeSelect from './createEstate/Components/ui/PropertyTypeSelector.tsx';
import TransactionTypeSelector from './createEstate/Components/ui/TransactionTypeSelector.tsx';

import CreateApartmentForm from './createEstate/forms/CreateApartmentForm.tsx';
import CreateHouseForm from './createEstate/forms/CreateHouseForm.tsx';
import CreateLandForm from './createEstate/forms/CreateLandForm.tsx';
import CurrencySelector from "../headerNavbar/CurrencySelector/CurrencySelector.tsx";
import ConvertPrice from "../utils/ConvertPrice.tsx";
import {useCurrency} from "../../context/global/CurrencyContext.tsx";



interface CreateEstateProps {
    // no props needed
}

const CreateEstate: React.FC<CreateEstateProps> = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [propertyType, setPropertyType] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [currencyType, setCurrencyType] = useState('');


    const handlePropertyTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPropertyType(event.target.value);
    };

    const handleTransactionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTransactionType(event.target.value);
    };

    const handleCurrencyTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrencyType(event.target.value);
    };

        const getPropertyForm = (type: string, isSell: boolean) => {
            switch (type) {
                case 'apartment':
                    return CreateApartmentForm;
                case 'house':
                    return CreateHouseForm;
                case 'land':
                    return CreateLandForm;
                default:
                    return null;
            }
        };

    const {currency: baseCurrency} = useCurrency()
        const price = ConvertPrice(121, 'EUR')
    console.log(price)


        const RenderPropertyForm = () => {
            const FormComponent = getPropertyForm(propertyType, transactionType === 'sell');
            const isRent = transactionType === 'rent';
            return FormComponent && (
                <FormComponent
                    isSell={transactionType === 'sell'}
                    isRent={isRent}
                    register={register}
                    errors={errors}
                    onChange={handleCurrencyTypeChange}
                    value={currencyType}
                />
            );
        };

    return (
        <div>
            <form onSubmit={handleSubmit(handleSubmit)}>
                <PropertyTypeSelect register={register} onChange={handlePropertyTypeChange} value={propertyType}/>
                <TransactionTypeSelector register={register} onChange={handleTransactionTypeChange} value={transactionType}/>
                <RenderPropertyForm/>
            </form>
            <p>Current currency: {price} {baseCurrency}</p>
        </div>
    );
};

export default CreateEstate;