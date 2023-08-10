import React from "react";
import "../../admin/styles/AdminMenu.css"

const AdminMenu = () => (
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
                    Online Exam
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
                            Questions
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-dark" href="/admin/exams">
                            Exams
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link  text-dark" href="/admin/results">
                            Results
                        </a>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-light"><span className="text-danger">LogOut</span></button>
                    </li>
                </ul>
            </div>
        </nav>


    </div>
);

export default AdminMenu;
