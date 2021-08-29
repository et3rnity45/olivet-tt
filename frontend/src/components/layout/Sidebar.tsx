import React from "react";
import { NavLink } from "react-router-dom";
import logo from "@Assets/logo/olivet-tt.png";

const Sidebar = (): JSX.Element => {
  return (
    <div className="fixed top-0 bottom-0 left-0 w-64 bg-lightBlue bg-opacity-95 shadow-card text-white">
      <div className="flex flex-col items-center px-6 mt-4 mb-6">
        <img className="w-16 h-auto" src={logo} alt="Logo USM Olivet TT" />
        <h3 className="text-xl font-semibold mt-4">USM Olivet TT</h3>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              className="inline-flex w-full py-3 px-4 text-sm hover:bg-lightBlue"
              to="/admin/user"
            >
              Gestion des utilisateurs
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
