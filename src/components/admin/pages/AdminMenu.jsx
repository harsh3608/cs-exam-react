import React from "react";
import "../../admin/styles/AdminMenu.css";
import { useNavigate } from 'react-router-dom'; 
import toastr from 'toastr';

const AdminMenu = () => {
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        toastr.success("logged out successfully.");
        navigate("/");
    }

    return (
<div>
        <nav className="navbar navbar-expand-lg d-flex flex-row justify-content-between">
            <div className="brand mx-3">
                <img
                    alt="logo"
                    src="/images/convergesol-final-logo.png"
                    width="100"
                    height="40"
                    className="d-inline-block align-top"
                />
                &nbsp;&nbsp;
                <h2 className="navbar-brand mt-2" >
                    Admin Dashboard
                </h2>
            </div>





            <div className="collapse navbar-collapse d-flex justify-content-end mx-3" id="navbarNav" >
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link text-dark" href="/admin/add-candidate" >
                            Add Candidate
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-dark" href="/admin/questions">
                            Manage Questions
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-dark" href="/admin/exams">
                            Manage Exams
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link  text-dark" href="/admin/results">
                            Exam Results
                        </a>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-light" onClick={() => logOut()}><span className="text-danger">LogOut</span></button>
                    </li>
                </ul>
            </div>
        </nav>


    </div>
    );
};

export default AdminMenu;
