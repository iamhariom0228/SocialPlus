import { Link } from "react-router-dom";
import "./login.scss";

import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {

   const { login } = useContext(AuthContext);

   const handleLogin = () => {
     login();
   };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            dolorem fugit, quod eligendi possimus soluta excepturi dolorum sit
            similique.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>LogIn</h1>
          <input type="text" name="username" placeholder="Username." />
          <input type="password" name="password" placeholder="Passowrd" />
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
