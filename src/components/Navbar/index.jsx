import React from "react";
import Navlink from "./Navlink";
import NavEnd from "./NavEnd";
import { useSelector } from "react-redux";

export default function NavbarComponent() {
  const { token, role } = useSelector((state) => state.users);
  const link = [
    { item: "Home", href: "/" },
    { item: "Shop", href: "/shop" },
    { item: "Checkout", href: "/checkout" },
  ];

  return (
    <nav className="navbar bg-[rgb(42,48,60)] p-0 flex items-center justify-center sticky top-0 z-30 md:h-[60px] h-[110px] w-full">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {token && role == "admin" ? (
            <>
              <Navlink item="Dashboard" href="/" isMobile />
              <Navlink item="Products" href="/admin/product" isMobile />
              <Navlink item="Sells Report" href="/admin/report" isMobile />
            </>
          ) : (
            <>
              <Navlink link={link} isMobile />
            </>
          )}
        </div>
        <a className="btn btn-ghost normal-case text-xl text-purple-300">
          <i className="fa-solid fa-bag-shopping pr-2 text-purple-600"></i>{" "}
          JAJAN.id
        </a>
      </div>
      {token && role == "admin" ? (
        <div className="navbar-center hidden lg:flex dark:text-slate-300 text-slate-300">
          <Navlink item="Dashboard" href="/" />
          <Navlink item="Products" href="/admin/product" />
          <Navlink item="Sells Report" href="/admin/report" />
        </div>
      ) : (
        <div className="navbar-center hidden lg:flex dark:text-slate-300 text-slate-300">
          <Navlink item="Home" href="/" />
          <Navlink item="Shop" href="/shop" />
          <Navlink item="Checkout" href="/checkout" />
        </div>
      )}

      <div className="navbar-end dark:text-slate-300 text-slate-300">
        {!token ? <NavEnd /> : <NavEnd isToken={token} role={role} />}
      </div>
    </nav>
  );
}
