import React from "react";
import { Link } from "wouter";

function Navigation(props) {
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
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/productlist">Products</Link>
          </li>
          <li>
            <Link href="/categorylist">Categories</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
