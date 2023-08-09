import React from "react";

import { withRouter } from "react-router-dom";

const Login = () => {
    return (
      <div>
        <LoginForm />
      </div>
    );
  };
  
  export default withRouter(Login);