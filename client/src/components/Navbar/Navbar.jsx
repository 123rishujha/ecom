import Styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={Styles.navbar_holder}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? Styles.active_nav_tab : Styles.nav_tab
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? Styles.active_nav_tab : Styles.nav_tab
        }
      >
        Profile
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          isActive ? Styles.active_nav_tab : Styles.nav_tab
        }
      >
        Cart
      </NavLink>
    </div>
  );
};

export default Navbar;
