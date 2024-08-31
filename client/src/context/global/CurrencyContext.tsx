import React, {createContext, useContext, useEffect} from "react";
import fetchUserCurrency from "../../api/global/fetchUserCurrency.tsx";


interface CurrencyContextType {
    currency: string;
    changeCurrency: (newCurrency: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = (): CurrencyContextType => {
    const context = useContext(CurrencyContext);
    if(!context) {
        throw new Error('useCurrency must be used within a CurrencyContextProvider');
    }
    return context;
};

interface CurrencyProviderType {
    children: React.ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderType) {
    const [ currency, setCurrency] = React.useState('CZK');

    useEffect(() => {
        const savedCurrency = localStorage.getItem('currency')
        if(savedCurrency) {
            setCurrency(savedCurrency);
        } else {
            const currency = fetchUserCurrency()
            setCurrency(currency);
            localStorage.setItem('currency', currency);
        }
    }, []);

    const changeCurrency = (newCurrency: string) => {
        setCurrency(newCurrency);
        localStorage.setItem('currency', newCurrency);
    }

    return (
        <CurrencyContext.Provider value ={{ currency, changeCurrency}}>
            {children}
        </CurrencyContext.Provider>
    )

}
