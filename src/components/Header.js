import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = (e) => setMobileMenu(!mobileMenu);
  return (
    <header className="container">
      <nav>
        <Link className="nav-logo" to="">
          <p>
            <strong>
              Crypto<span style={{ color: "#27AB83" }}>watch</span>
            </strong>
          </p>
        </Link>

        <ul className={"nav-link-list " + (mobileMenu ? "open" : "")}>
          <li className="nav-link">
            <Link to="/" role="menu item">
              Home
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/about-app" role="menu item">
              About This App
            </Link>
          </li>
        </ul>
      </nav>

      {/*Mobile Menu Utilities*/}
      <div id="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        id="close-menu"
        className={mobileMenu ? "open" : ""}
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
      </div>
      <a href="#" id={mobileMenu ? "overlay" : ""} onClick={toggleMenu}></a>
    </header>
  );
};

export default Header;
