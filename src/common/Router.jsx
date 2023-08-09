import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import AdminDashboard from "../components/admin/pages/AdminDashboard";
import UserDashboard from "../components/user/pages/UserDashboard";
import NotFound from "../common/NotFound"
import Login from "./Login";

const Router = () => (
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default Router;