import React from 'react';
import HeaderNavbar from './Components/headerNavbar/HeaderNavbar.tsx';
import AppRoutes from "./utils/routes/routes.tsx";
import {CurrencyProvider} from "./context/global/CurrencyContext.tsx";

function App() {
    return (
        <>
            <CurrencyProvider>
                <HeaderNavbar />
                <AppRoutes/>
            </CurrencyProvider>
        </>
    );
}

export default App;
