import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext"; // State Manajemen
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

// import useMutation from react-query
import { useMutation } from "react-query";

// Get API config
import { API } from "../../config/api";

export const Login = () => {
  const navigate = useNavigate();

  const title = "Login";
  document.title = "Dumbmers | " + title;

  const [state, dispatch] = useContext(UserContext); // useContext

  const [message, setMessage] = useState(null);

  // Create variabel for store data with useState
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // dikeluarkan
  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // convert data menjadi string, untuk dikirim ke database
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/login", body, config);
      console.log(response);

      // Checking Process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data, // data disimpan ke payload
        });
      }
      
      if (response.data.data.status === "admin") {
        navigate("/complain");
      } else {
        navigate("/");
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <>
      <div className="card border-red text-end mb-5 rounded-3">
        <div className="card-body bg-var-dark p-4">
          <h3 className="text-start mb-3 ">Login</h3>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <span className="text-center">{message && message}</span>
            <div className="input-group mb-3">
              <input type="Email" className="form-control bg-var-dark text-white border-form" placeholder="Email" name="email" onChange={handleChange} value={email} required />
            </div>
            <div className="input-group mb-3">
              <input type="password" className="form-control bg-var-dark text-white border-form" placeholder="Password" name="password" onChange={handleChange} value={password} required />
            </div>
            <button className="btn bg-var-red text-white fw-bold container">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
