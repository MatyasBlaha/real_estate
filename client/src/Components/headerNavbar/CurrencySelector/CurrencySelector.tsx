import React from 'react';
import {useCurrency} from "../../../context/global/CurrencyContext.tsx";
import SelectInput from "../../ui/forms/SelectInupt.tsx";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

const CurrencySelector: React.FC = () => {
    const { currency, changeCurrency } = useCurrency()

    const currencyTypeOption =  [
        { value: 'CZK', label: 'CZK' },
        { value: 'EUR', label: 'EUR' },
        { value: 'USD', label: 'USD' },
    ]

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        changeCurrency(event.target.value);
    }
    return (
        <SelectInput
            label='choose currency'
            name='currency'
            placeholder='select a currency'
            options={currencyTypeOption}
            required={true}
            onChange={handleCurrencyChange}
            />
    )

}

export default CurrencySelector;