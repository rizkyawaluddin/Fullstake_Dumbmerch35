import React, { useState } from "react";
import Image from "../assets/img/Logo-Dumb-Merch.png";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Navbar from "../components/navbar/Navbar";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  const switchRegister = () => {
    setIsRegister(true);
  };

  const switchLogin = () => {
    setIsRegister(false);
  };

  return (
    <>
      <div className="container text-white d-lg-flex align-items-center justify-content-center height-90">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-6 col-12 text-lg-start text-center ">
            <img src={Image} style={{ maxWidth: "200px" }} />
            <h2 className="mt-lg-2 mt-3 ">Easy, Fast and Reliable</h2>
            <p className="text-var-gray">
              Go shopping for merchandise, just go to dumb merch shopping. the biggest merchandise in <span className="text-var-gray fw-bold">Indonesia</span>{" "}
            </p>
            <div className="mt-lg-5 mt-2 mb-lg-0 mb-5 text-lg-start text-center">
              <button className="btn bg-var-red text-white fw-bold px-5 me-2" onClick={switchLogin}>
                Login
              </button>
              <button className="btn text-white fw-bold px-5 text-light ms-2" onClick={switchRegister}>
                Register
              </button>
            </div>
          </div>
          <div className="col-lg-6 col-12 px-5">{isRegister ? <Register /> : <Login />}</div>
        </div>
      </div>
    </>
  );
};

export default Auth;
