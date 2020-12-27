import { useContext } from "react";

import "./style.css";

import Logo from "../Logo";
import NavbarItem from "../NavbarItem";

import AuthContext from "../../context/Auth";

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  const isLoggedIn = () => {
    return !!auth.token;
  };

  return (
    <nav className="navbar">
      <div className="navbar__header">
        <div className="navbar__header-logo">
          <Logo />
        </div>
        <h1 className="navbar__header-title">Burger Builder</h1>
      </div>
      <ul className="navbar__menu">
        <NavbarItem className="navbar__link" path="/">
          Build
        </NavbarItem>
        {isLoggedIn() ? (
          <>
            <NavbarItem className="navbar__link" path="/orders">
              Orders
            </NavbarItem>
            <NavbarItem className="navbar__link--highlighted" path="/logout">
              Logout
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="navbar__link--highlighted" path="/login">
              Login
            </NavbarItem>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
