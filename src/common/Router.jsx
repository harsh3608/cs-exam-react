import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
//import AdminDashboard from "../components/admin/pages/AdminDashboard";
import UserDashboard from "../components/user/pages/UserDashboard";
import NotFound from "../common/NotFound"
import Login from "./Login";
import ProtectedRoute from "../util/ProtectedRoute";
import AdminMenu from "../components/admin/pages/AdminMenu";

const Router = () => (
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={ <ProtectedRoute><AdminMenu /></ProtectedRoute> } />
        <Route path="/user" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default Router;