import {useCurrency} from "../../context/global/CurrencyContext.tsx";


const ConvertPrice = (price: number, currency: string) => {
    const {currency: baseCurrency} = useCurrency()

    console.log(price)
    console.log(currency)
    console.log(baseCurrency)

    const exchangeRates: { [key: string]: number} = {
        USD: 1,
        EUR: 0.85,
        CZK: 24,
    }

    if(!exchangeRates[baseCurrency] || !exchangeRates[currency]){
        throw new Error(`Unsupported currency: ${currency} or ${baseCurrency}`);
    }

    const priceInUsd = price / exchangeRates[currency]

    const convertedPrice = priceInUsd * exchangeRates[baseCurrency]

    return convertedPrice.toFixed(0);

}

export default ConvertPrice;