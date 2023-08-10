import React from "react";
// import { BrowserRouter, Routes, Route, } from "react-router-dom";
// import ProtectedRoute from "../../../util/ProtectedRoute";
// import AddUser from "../../../common/AddUser";
// import QuestionList from "./questions/QuestionList";
// import ExamList from "./exams/ExamList";
// import ResultList from "./results/ResultList";

const AdminMenu = () => (
    <div>
        <nav className="navbar navbar-expand-lg  bg-light">
            <img
                alt="logo"
                src="/images/convergesol-final-logo.png"
                width="100"
                height="40"
                className="d-inline-block align-top"
            />
            <h3 className="navbar-brand" >
                Online Exam
            </h3>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/admin/add-candidate">
                            Add Candidate
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/admin/questions">
                            Questions
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/admin/exams">
                            Exams
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/admin/results">
                            Results
                        </a>
                    </li>
                </ul>
            </div>
        </nav>


        {/* <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/admin/add-candidate" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
                    <Route path="/admin/questions" element={<ProtectedRoute><QuestionList /></ProtectedRoute>} />
                    <Route path="/admin/exams" element={<ProtectedRoute><ExamList /></ProtectedRoute>} />
                    <Route path="/admin/results" element={<ProtectedRoute><ResultList /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </div> */}


    </div>
);

export default AdminMenu;
