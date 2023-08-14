import React, { useState } from "react";
import AdminMenu from "../../components/admin/pages/AdminMenu";
import "./AddUser.css";

const AddUserForm = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);


    const passwordChange = (event) => {
        setPassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const repeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    };

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword((prevShowRepeatPassword) => !prevShowRepeatPassword);
    };

    return (
        <>

            <div className="add-form border rounded-3 p-3">
                <div className="d-flex justify-content-center" >
                    <h3>Candidate Registration</h3>

                </div>
                <hr></hr>
                <div className="row">

                    <div className="row my-3">
                        <div className="col">
                            <div className="col">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="input"

                                    className="form-control"
                                    placeholder="First Name"
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="col">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="input"


                                    className="form-control"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col">
                            <div className="col">
                                <label>Mobile Number</label>
                                <input
                                    type="text"
                                    name="input"

                                    className="form-control"
                                    placeholder="Mobile Number"
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className="col">
                                <label>Email</label>
                                <input
                                    type="text"
                                    name="input"


                                    className="form-control"
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col">
                            <div>
                                <label>Gender</label>
                                <select className="form-control" >
                                    <option value={''}>Select Gender</option>
                                    <option value={'Male'}>Male</option>
                                    <option value={'Female'}>Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>

                    <div className="row my-3">
                        <div className="col">
                            <label htmlFor="password">New Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={passwordChange}
                                placeholder="Password"
                            />
                            <span className="pass-icon-container">
                                {showPassword ? (
                                    <span
                                        className="material-icons"
                                        onClick={togglePasswordVisibility}
                                    >
                                        visibility_off
                                    </span>
                                ) : (
                                    <span
                                        className="material-icons"
                                        onClick={togglePasswordVisibility}
                                    >
                                        visibility
                                    </span>
                                )}
                            </span>

                        </div>

                        <div className="col">
                            <label htmlFor="password">Confirm New Password</label>
                            <input
                                type={showRepeatPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                value={repeatPassword}
                                onChange={repeatPasswordChange}
                                placeholder="Password"
                            />
                            <span className="con-pass-icon-container">
                                {showRepeatPassword ? (
                                    <span
                                        className="material-icons"
                                        onClick={toggleRepeatPasswordVisibility}
                                    >
                                        visibility_off
                                    </span>
                                ) : (
                                    <span
                                        className="material-icons"
                                        onClick={toggleRepeatPasswordVisibility}
                                    >
                                        visibility
                                    </span>
                                )}
                            </span>

                        </div>
                    </div>

                    <div className="row my-3">
                        <div class="col-6 offset-3">
                            <div class="d-grid">
                                <button className="btn btn-primary">
                                    Add Candidate
                                </button>
                            </div>
                        </div>
                    </div>


                </div>


            </div>

        </>
    );
};

const AddUser = () => {
    return (
        <>
            <AdminMenu />
            <AddUserForm />
        </>
    );
};


export default AddUser;
