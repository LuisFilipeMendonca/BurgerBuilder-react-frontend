import { NavLink } from "react-router-dom";

import "./style.css";

const NavbarItem = ({ className, path, children }) => {
  return (
    <li className="navbar__item">
      <NavLink className={className} to={path} exact>
        {children}
      </NavLink>
    </li>
  );
};

export default NavbarItem;
