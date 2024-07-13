import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
        <div>
            <Link to="/form">Register</Link>
            <Link to="/login">Login</Link>
        </div>
            <Routes>

            </Routes>
    </div>
  );
}

export default App;
