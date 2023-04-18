import React from "react";
import { Link, useLocation } from "wouter";

function Header(props) {
  const [location] = useLocation();
  return (
    <header className="container-fluid">
      <nav>
        <ul>
          <li>
            <strong>API Backend</strong>
          </li>
        </ul>
        <ul>
          <li>
            <Link className={location === "/" ? "contrast" : ""} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className={location === "/productlist" ? "contrast" : ""}
              href="/productlist"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className={location === "/categoryedit" ? "contrast" : ""}
              href="/categoryedit"
            >
              Categories
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
