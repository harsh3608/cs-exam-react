import React from "react";

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
            <a className="navbar-brand" href="/">
                Online Exam
            </a>
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
                        <a className="nav-link" href="/add-candidate">
                            Add Candidate
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/questions">
                            Questions
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/exams">
                            Exams
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/results">
                            Results
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

    </div>
);

export default AdminMenu;
