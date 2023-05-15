import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components

import Login from "./session/Login";
import Error404 from "./errors/error404";
//forbidden routes
import Dashboard from './user/Dashboard.jsx';
import EditProfile from './user/EditProfile.jsx';


export default function Rutas() {
    

    return (
    <Router>
        <div>
        
        <Routes>
            <Route path="/" element={<Login />} exact />
            <Route path="/login" element={<Login />} exact />
            
            <Route path="/edit" element={<EditProfile />} exact />
            
            <Route path="/profile" element={<Dashboard />} exact />
            <Route path="*" element={<Error404/>} />
        </Routes>
        </div>
    </Router>
    );
}
