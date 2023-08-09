import React, { Component } from "react";
import "./login.css"; 

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      showPassword: false,
    };

    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = () => {
    this.togglePasswordVisibility();
  };

  togglePasswordVisibility = () => {
    // this.state.showPassword = !this.state.showPassword;
    // console.log(this.state.showPassword);

    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  emailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  passwordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleSubmit(event) {
    const { history } = this.props;

    console.log("form has been submitted: ");
    console.log(this.state.email + " - " + this.state.password);

    fetch("http://13.90.224.87:8099/api/Login/SignIn", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.isSuccess) {
          window.alert("logged in successfully.");
          console.log("logged in successfully.");
          localStorage.setItem("token", result.response.token);
          history.push("/home");
        } else {
          console.log("log in failed.");
        }
      });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="form-box  rounded-3 p-3">
          <div className="p-3 d-flex justify-content-center">
            <h3>User Login</h3>
          </div>

          <form method="post" onSubmit={this.handleSubmit}>
            <div className="row my-3">
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={this.state.email}
                  onChange={this.emailChange}
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
                  type={this.state.showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={this.state.password}
                  onChange={this.passwordChange}
                  placeholder="Password"
                />
                <span className="icon-container" >
                  { this.state.showPassword ? (
                    <span
                      className="material-icons"
                      onClick={this.togglePasswordVisibility}
                    >
                      visibility_off
                    </span>
                  ) : (
                    <span
                      className="material-icons"
                      onClick={this.togglePasswordVisibility}
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
      </div>
    );
  }
}

const Login = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
