import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import DashboardAdmin from "../Pages/admin/Dashboard";
import DashboardMember from "../Pages/member/Dashboard";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                {/* auth route */}
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                
                <Route  element={<ProtectedRoute/>}>
                    <Route path="/" element={<Home/>} />

                    {/* admin route */}
                    <Route path="/admin" element={<DashboardAdmin/>} />


                    {/* Member Raoute */}
                    <Route path="/member" element={<DashboardMember/>} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}