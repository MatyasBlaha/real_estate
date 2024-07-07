import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from "react-router-dom";

import RegistrationForm from "./RegistrationForm";
import Login from "./Login";

import VerifyEmail from "../src/Components/VerifyEmail";

function App() {
  return (
    <div className="App">
        <div>
            <Link to="/form">Register</Link>
            <Link to="/login">Login</Link>
        </div>
            <Routes>
                <Route exact path="/form" element={<RegistrationForm/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/verify/email/:token" element={<VerifyEmail/>} />
            </Routes>
    </div>
  );
}

export default App;
