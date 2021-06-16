import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";
import navLinks from "../../../config";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import "./hambox.css";

const HamBox = (): JSX.Element => {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  useOnClickOutside(wrapperRef, () => setMenuOpen(false));

  useEffect(() => {
    document.body.className = menuOpen ? "blur" : "";
    return () => {
      document.body.className = "";
    };
  }, [menuOpen]);

  return (
    <div ref={wrapperRef} className="block lg:hidden">
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Menu"
        className="flex lg:hidden justify-center items-center relative z-10 -mr-4 p-4"
      >
        <div className="inline-block relative w-8 h-6">
          <div
            className={`ham-box-inner ${menuOpen ? "ham-open" : "ham-close"}`}
          />
        </div>
      </button>
      <aside
        aria-hidden={!menuOpen}
        className={`flex items-center fixed top-0 bottom-0 right-0 py-12 px-2 h-screen bg-lightBlue lg:hidden ${
          menuOpen ? "active" : ""
        }`}
      >
        <nav className="flex-1 px-8">
          <ul className="text-lg uppercase">
            {navLinks.map((navLink) =>
              navLink.subLinks ? (
                <li className="text-center py-3" key={navLink.name}>
                  <button type="button" className="text-lg uppercase">
                    {navLink.name}
                  </button>
                  <ChevronDownIcon className="inline-block ml-2 h-6" />
                  <ul className="text-base capitalize py-1 opacity-80">
                    {navLink.subLinks.map((subLink) => (
                      <li key={subLink.name}>
                        <NavLink
                          to={subLink.href}
                          activeClassName="text-lightRed"
                          exact
                          onClick={() => setMenuOpen(false)}
                        >
                          {subLink.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li className="text-center py-2" key={navLink.name}>
                  <NavLink
                    to={navLink.href}
                    activeClassName="text-lightRed"
                    exact
                    onClick={() => setMenuOpen(false)}
                  >
                    {navLink.name}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default HamBox;
