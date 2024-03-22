import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/login");
    message.success("Logout Successfull..");
  };
  return (
    <>
      <nav className=" nav navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid container">
          <Link className="navbar-brand" to="/">
            <h1 className="maintitle">Expense Traker</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={logoutHandler} className=" btn btn-danger">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
