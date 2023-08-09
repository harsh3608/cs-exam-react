import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

const Router = () => (
  <div>
    <BrowserRouter>
      <Routes>
        
        <Route path="/admin" element={<Login />} />
        <Route path="/user" element={<Register />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default Router;