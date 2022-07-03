import { React, useState, useContext } from "react";
import "../../assets/static/css/navbar.css";
import IconDumbmers from "../../assets/img/icon/icon-dumb-merch.png";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const Navbar = () => {
  const navigate = useNavigate();

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
                  to="/complain"
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
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? "#F74D4D" : "#ffffff",
                  })}
                >
                  Product
                </NavLink>

                {/* <li className="nav-item dropdown me-2">

                  <a className="nav-link dropdown-toggle" href="/cart" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <FontAwesomeIcon icon={solid('cart-shopping')} size='lg' />
                      <sup className="ms-1" style={{ fontSize: '15px', color: 'greenyellow' }}>+6</sup>
                  </a>
                      
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><Link className="dropdown-item" to="cart">Mouse (1x)</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><span className="dropdown-item">Total Product</span></li>
                  </ul>
                </li> */}

              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link fw-bold"
                  to="/profile-page"
                  style={({ isActive }) => ({
                    color: isActive ? "#F74D4D" : "#ffffff",
                  })}
                >
                  Profile
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
