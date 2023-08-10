import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  console.log(error);

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
          <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
          <input type="password" name="password" placeholder="Passowrd" onChange={handleChange}/>
          {error && <span className="error">{error}</span>}
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
