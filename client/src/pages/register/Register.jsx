import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/auth/register", inputs, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  console.log(error);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <input type="text" name="name" placeholder="Name" onChange={handleChange}/>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <input
            type="password"
            name="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          {error && <span className="error">{error}</span>}
          <button type="submit" onClick={handleSubmit}>Register</button>
        </div>
        <div className="right">
          <h1>Social Sphere</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
            cumque doloremque ut totam incidunt ad quae dolores fuga
            exercitationem soluta eos, quas vero doloribus.
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button>LogIn</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
