import { NavLink } from "react-router-dom";

import "./style.css";

import Logo from "../Logo";

const Navbar = () => {
  const isLoggedIn = false;

  return (
    <nav className="navbar">
      <div className="navbar__header">
        <div className="navbar__header-logo">
          <Logo />
        </div>
        <h1 className="navbar__header-title">Burger Builder</h1>
      </div>
      <ul className="navbar__menu">
        <li className="navbar__item">
          <NavLink className="navbar__link" to="/" exact>
            Build
          </NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li className="navbar__item">
              <NavLink className="navbar__link" to="/orders">
                Orders
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink className="navbar__link" to="/logout">
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="navbar__item">
              <NavLink className="navbar__link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink className="navbar__link--highlighted" to="/register">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
