import React, { useState } from "react";
import "./login.css";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading spinner

  const navigate = useNavigate();

  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Show loading spinner

    setTimeout(() => {
      fetch("http://13.90.224.87:8099/api/Login/SignIn", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.isSuccess) {
            toastr.success("logged in successfully.");
            console.log(result);
            localStorage.setItem("token", result.response.token);
            localStorage.setItem("role", result.response.userRole);
            if (result.response.userRole === "Users") {
              navigate("/user");
            } else {
              navigate("/admin");
            }
          } else {
            toastr.error("log in failed.");
          }
        })
        .finally(() => {
          setLoading(false); // Hide loading spinner
        });
    }, 3000);
  };

  return (
    <>
      {loading ? (
        <div style={{ 'marginTop': '20%', 'marginLeft': '45%' }}>
          {/* <div className="spinner-border text-info" style={{'scale':'2.0'}}></div> */}

          <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

        </div>
      ) : (

        <div className="form-box  rounded-3 p-3">
          <div className="p-3 d-flex justify-content-center">
            <h3>User Login</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row my-3">
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={emailChange}
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
            </div>

            <div className="row my-3">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={passwordChange}
                  placeholder="Password"
                />
                <span className="icon-container">
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
            </div>

            <div className="my-3 d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}


    </>
  );
};

const Login = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
