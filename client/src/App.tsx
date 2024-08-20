import AppRoutes from './routes.tsx';
import HeaderNavbar from './Components/Navbar/Navbar.tsx';
import { UserContextProvider } from "./context/useUserContext.tsx";

import { getUsernameFromCookies } from "./utils/cookieUtils.ts";

function App() {
    const initialUser: string | null = getUsernameFromCookies() || null;

    return (
                <UserContextProvider initialUser={initialUser}>
                    <div className="App">
                        <HeaderNavbar/>
                        <AppRoutes/>
                    </div>
                </UserContextProvider>
    );
}

export default App;