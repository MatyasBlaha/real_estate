import AppRoutes from './routes';
import HeaderNavbar from './Components/Navbar/Navbar';
import { UserProvider } from "./context/UserContext";

import { getUsernameFromCookies } from "./utils/cookieUtils";

function App() {
    const initialUser = getUsernameFromCookies();

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