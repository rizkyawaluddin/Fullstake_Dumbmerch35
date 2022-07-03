import { React, useState, useContext } from "react";
import "../../assets/static/css/navbar.css";
import IconDumbmers from "../../assets/img/icon/icon-dumb-merch.png";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showAdmin, setShowAdmin] = useState(true);

  const [state, dispatch] = useContext(UserContext);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    // navigate('/auth')
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-height">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={IconDumbmers} alt="icon-navbar" width="45px" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-center" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold"
                  to="/complain-admin"
                  style={({ isActive }) => ({
                    color: isActive ? "#F74D4D" : "#ffffff",
                  })}
                >
                  Complain
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold"
                  to="/category-admin"
                  style={({ isActive }) => ({
                    color: isActive ? "#F74D4D" : "#ffffff",
                  })}
                >
                  Category
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold"
                  to="/product-admin"
                  style={({ isActive }) => ({
                    color: isActive ? "#F74D4D" : "#ffffff",
                  })}
                >
                  Product
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold"
                  to="/auth"
                  onClick={logout}
                  style={({ isActive }) => ({
                    color: isActive ? "#F74D4D" : "#ffffff",
                  })}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
