import React from 'react';
import HeaderNavbar from './Components/Navbar/Navbar.tsx';
import AppRoutes from "./utils/routes/routes.tsx";

function App() {
    return (
        <>
            <HeaderNavbar />
            <AppRoutes/>
        </>
    );
}

export default App;
