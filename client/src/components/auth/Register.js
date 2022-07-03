import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

// import useMutation from react-query
import { useMutation } from "react-query";

// Get API config
import { API } from "../../config/api";

const Register = () => {
  const navigate = useNavigate();

  const title = "Register";
  document.title = "Dumbmers | " + title;

  // Create variabel for store data with useState
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // dikeluarkan
  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, //? name
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
      const response = await API.post("/register", body, config);

      setMessage("Register Success");

      if (response.data.status === "Success") {
        const alert = (
          <Alert variant="success" className="py-1">
            {response.data.message}
          </Alert>
        );

        setForm({
          name: "",
          email: "",
          password: "",
        });
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
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
          <h3 className="text-start mb-3 ">Register </h3>
          <span className="text-center">{message && message}</span>
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className="input-group mb-3">
              <input type="text" className="form-control bg-var-dark text-white border-form" placeholder="Full Name" name="name" onChange={handleChange} value={name} required />
            </div>
            <div className="input-group mb-3">
              <input type="Email" className="form-control bg-var-dark text-white border-form" placeholder="Email" name="email" onChange={handleChange} value={email} required />
            </div>
            <div className="input-group mb-3">
              <input type="password" className="form-control bg-var-dark text-white border-form" placeholder="Password" name="password" onChange={handleChange} value={password} required />
            </div>
            <button className="btn bg-var-red text-white fw-bold container" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
