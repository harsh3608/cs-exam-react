import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
//import AdminDashboard from "../components/admin/pages/AdminDashboard";
import UserDashboard from "../components/user/pages/UserDashboard";
import NotFound from "../common/NotFound"
import Login from "./user-login/Login";
import ProtectedRoute from "../util/ProtectedRoute";
import AdminMenu from "../components/admin/pages/AdminMenu";
import AddUser from "./add-user/AddUser";
import QuestionList from "../components/admin/pages/questions/QuestionList";
import ExamList from "../components/admin/pages/exams/ExamList";
import ResultList from "../components/admin/pages/results/ResultList";
import QuestionAdd from "../components/admin/pages/questions/QuestionAdd";
import DetailedResult from "../components/admin/pages/results/DetailedResult";
import QuestionUpdate from "../components/admin/pages/questions/QuestionUpdate";
import ScheduleNewExam from "../components/admin/pages/exams/ScheduleNewExam";

const Router = () => (
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<ProtectedRoute><AdminMenu /></ProtectedRoute>} />
        <Route path="/admin/add-candidate" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />

        <Route path="/admin/questions" element={<ProtectedRoute><QuestionList /></ProtectedRoute>} />
        <Route path="/admin/add-question" element={<ProtectedRoute><QuestionAdd /></ProtectedRoute>} />
        <Route path="/admin/update-question" element={<ProtectedRoute><QuestionUpdate /></ProtectedRoute>} />


        <Route path="/admin/exams" element={<ProtectedRoute><ExamList /></ProtectedRoute>} />
        <Route path="/admin/schedule-new-exam" element={<ProtectedRoute><ScheduleNewExam /></ProtectedRoute>} />

        <Route path="/admin/results" element={<ProtectedRoute><ResultList /></ProtectedRoute>} />
        <Route path="/admin/result-details/:examId/:userId/:name" element={<ProtectedRoute><DetailedResult /></ProtectedRoute>} />





        <Route path="/user" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />











        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default Router;