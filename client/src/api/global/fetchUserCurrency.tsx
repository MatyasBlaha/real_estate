

const fetchUserCurrency = async (): Promise<string> => {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = response.json();
        return data.currency || 'CZK';
    } catch (error) {
        console.error('Failed to fetch user currency ', error)
        return 'CZK';
    }
}

export default fetchUserCurrency;