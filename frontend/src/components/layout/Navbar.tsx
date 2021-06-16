import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/olivet-tt.png";
import navLinks from "../../config";
import HamMenu from "../base/HamBox/HamMenu";

type NavbarProps = {
  transparent: boolean;
  slideIn?: boolean;
};

const Navbar = ({ transparent, slideIn = true }: NavbarProps): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);

  const defaultNav = transparent
    ? "bg-darkBlue lg:bg-transparent relative lg:absolute"
    : "bg-darkBlue relative";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && slideIn) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, slideIn]);

  return (
    <header
      className={`h-20 text-white whitespace-nowrap flex w-full z-20 ${
        isScrolled
          ? "bg-darkBlue fixed transition duration-300 ease-in-out transform -top-60 translate-y-60"
          : defaultNav
      }`}
    >
      <nav className="flex-grow flex justify-between items-center mx-6 sm:mx-8">
        {/* Left Nav */}
        <Link className="flex justify-center items-center p-2" to="/">
          <img className="h-16" src={logo} alt="Olivet TT Logo" />
          <p className="text-2xl ml-3">Olivet TT</p>
        </Link>
        {/* Right Nav */}
        <ul className="h-full hidden lg:flex">
          {navLinks.map((navLink) =>
            navLink.subLinks ? (
              <li className="relative sub-menu" key={navLink.name}>
                <button
                  type="button"
                  className="nav-link relative h-full flex items-center mx-4 uppercase opacity-80 hover:opacity-90"
                >
                  {navLink.name}
                </button>
                <ul className="absolute bg-white text-lightBlack rounded left-0 origin-top-left py-4 invisible opacity-0 transform scale-95 transition-all duration-100 ease-in-out">
                  <div className="absolute w-2 h-2 transform rotate-45 bg-white -top-1 left-10" />
                  {navLink.subLinks.map((subLink) => (
                    <li key={subLink.name}>
                      <NavLink
                        to={subLink.href}
                        className="relative h-full flex items-center px-4 py-2 uppercase opacity-80 hover:opacity-90 hover:text-lightRed"
                        activeClassName="opacity-100"
                        exact
                      >
                        {subLink.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={navLink.name}>
                <NavLink
                  to={navLink.href}
                  className="nav-link relative h-full flex items-center mx-4 uppercase opacity-80 hover:opacity-90"
                  activeClassName="opacity-100"
                  exact
                >
                  {navLink.name}
                </NavLink>
              </li>
            )
          )}
        </ul>
        {/* HamMenu + Sidebar */}
        <HamMenu />
      </nav>
    </header>
  );
};

export default Navbar;
