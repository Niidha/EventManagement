import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../Components/Layouts/HomePage";
import { EventsList } from "../Components/eventlisting";
import Signup from "../Components/User/signup";
import Login from "../Components/User/login";
import { ProtectedRoute } from "./ProtectedRoute";
import UpdateUser from "../Components/User/updateuser";
import UserDashboard from "../Components/User/userdashboard";
import EventDetails from "../Components/eventdetails";
import CreateEvent from "../Components/User/creaateevent";
import EditEvent from "../Components/User/editevent";
import AdminDashboard from "../Components/Admin/admindashboard";
import UserManagement from "../Components/Admin/adminuser";
import EventManagement from "../Components/Admin/adminevent";
import AdminStatistics from "../Components/Admin/adminstats";
import Chart from "../Components/Admin/adminstats";
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<EventsList />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/update" element={<ProtectedRoute allowedRoles={["user"]}><UpdateUser /></ProtectedRoute>} />
                <Route path="/user-dashboard" element={<ProtectedRoute allowedRoles={["user"]}><UserDashboard/></ProtectedRoute>} />
                <Route path="/create" element={<ProtectedRoute allowedRoles={["user"]}><CreateEvent /></ProtectedRoute>} />
                <Route path="/edit/:eventId" element={<ProtectedRoute allowedRoles={["user","admin"]}><EditEvent /></ProtectedRoute>} />
                <Route path="/event/:eventId" element={<EventDetails />} />

                {/*admin routes */}
                <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/adminevent" element={<ProtectedRoute allowedRoles={["admin"]}><EventManagement/></ProtectedRoute>} />
                <Route path="/adminusermanage" element={<ProtectedRoute allowedRoles={["admin"]}><UserManagement/></ProtectedRoute>} />
                <Route path="/adminstatistics" element={<ProtectedRoute allowedRoles={["admin"]}><Chart/></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
