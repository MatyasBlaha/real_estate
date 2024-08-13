import AppRoutes from './routes';
import HeaderNavbar from './Components/Navbar/Navbar';
import { UserProvider } from "./context/UserContext";
import { ToastContextProvider} from "./context/ToastContext";
import { useToast } from "./hooks/useToast";
import { getUsernameFromCookies } from "./utils/cookieUtils";

function App() {
    const initialUser = getUsernameFromCookies();
    const toast = useToast()

    return (
                <UserProvider initialUser={initialUser}>
                    <div className="App">

                        <div className="btn-container">
                            <button
                                className="success-btn"
                                onClick={() => toast.success("Success toast notification")}
                            >
                                Success
                            </button>
                            <button
                                className="info-btn"
                                onClick={() => toast.info("Info toast notification")}
                            >
                                Info
                            </button>
                            <button
                                className="warning-btn"
                                onClick={() => toast.warning("Warning toast notification")}
                            >
                                Warning
                            </button>
                            <button
                                className="error-btn"
                                onClick={() => toast.error("Error toast notification")}
                            >
                                Error
                            </button>
                        </div>

                        <HeaderNavbar/>
                        <AppRoutes/>
                    </div>
                </UserProvider>
    );
}

export default App;