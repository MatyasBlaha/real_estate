import AppRoutes from './routes';
import HeaderNavbar from './Components/Navbar/Navbar.tsx';
import { UserProvider } from "./context/UserContext.tsx";

import { getUsernameFromCookies } from "./utils/cookieUtils";

function App() {
    const initialUser: string | null = getUsernameFromCookies() || null;

    return (
                <UserProvider initialUser={initialUser}>
                    <div className="App">
                        <HeaderNavbar/>
                        <AppRoutes/>
                    </div>
                </UserProvider>
    );
}

export default App;