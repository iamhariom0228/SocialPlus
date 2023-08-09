import { Link } from "react-router-dom";
import "./register.scss";

import React from "react";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="username" placeholder="Username" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input
            type="password"
            name="password"
            placeholder="Confirm Password"
          />
          <button type="submit">Register</button>
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
