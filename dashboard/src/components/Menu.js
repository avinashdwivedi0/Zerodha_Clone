import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LANDING_URL = process.env.REACT_APP_LANDING_URL || "http://localhost:3001";

const readAccount = () => {
  try {
    const savedUser = localStorage.getItem("zerodhaUser");
    if (savedUser) return JSON.parse(savedUser);

    const handoffPrefix = "zerodha-account:";
    if (window.name.startsWith(handoffPrefix)) {
      const handedOffUser = JSON.parse(window.name.slice(handoffPrefix.length));
      window.name = "";
      localStorage.setItem("zerodhaUser", JSON.stringify(handedOffUser));
      return handedOffUser;
    }
  } catch {
    window.name = "";
  }
  return null;
};

const Menu = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(readAccount);
  const profileRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileDropdownOpen(false);
    };
    const syncUser = () => {
      try { setUser(JSON.parse(localStorage.getItem("zerodhaUser") || "null")); }
      catch { setUser(null); }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    window.addEventListener("storage", syncUser);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("zerodhaUser");
    setUser(null);
    window.location.assign(`${LANDING_URL}/login`);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="logo" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
            >
              <p className={location.pathname === "/" ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
            >
              <p className={location.pathname === "/orders" ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
            >
              <p className={location.pathname === "/holdings" ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
            >
              <p className={location.pathname === "/positions" ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
            >
              <p className={location.pathname === "/funds" ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
            >
              <p className={location.pathname === "/apps" ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile-wrap" ref={profileRef}>
          <button className="profile" type="button" aria-expanded={isProfileDropdownOpen} aria-label="Open profile menu" onClick={() => setIsProfileDropdownOpen((open) => !open)}>
            <div className="avatar">{user?.fullName?.trim()?.charAt(0)?.toUpperCase() || "Z"}</div>
            <span className="profile-identity">
              <span className="username">{user?.fullName || "Account"}</span>
              {user?.email && <span className="profile-email">{user.email}</span>}
            </span>
            <span className="profile-chevron" aria-hidden="true">v</span>
          </button>
          {user && <button className="account-logout" type="button" onClick={logout}>Log out</button>}
          {isProfileDropdownOpen && <div className="profile-dropdown">
            <div className="profile-summary">
              <strong>{user?.fullName || "Zerodha account"}</strong>
              <span>{user?.email || "Your trading account"}</span>
            </div>
            {user ? <Link to="/funds" onClick={() => setIsProfileDropdownOpen(false)}>Funds &amp; balances</Link> : <a href={`${LANDING_URL}/login`}>Log in to your account</a>}
            {user && <button type="button" onClick={logout}>Log out</button>}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Menu;
