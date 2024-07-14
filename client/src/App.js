import './App.css';
import { Link } from "react-router-dom";

import AppRoutes from './routes'

import HeaderNavbar from './Components/Navbar/Navbar'
import {UserProvider} from "./context/UserContext";


function App() {
  return (
      <UserProvider>
          <div className="App">
              <HeaderNavbar/>
              <AppRoutes/>
          </div>
      </UserProvider>
  );
}

export default App;
