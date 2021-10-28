// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  NewspaperIcon,
  UserGroupIcon,
  UsersIcon,
  ChartBarIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import logo from "@Assets/logo/olivet-tt.png";

const navigation = [
  { name: "Tableau de Bord", href: "/admin", icon: HomeIcon },
  { name: "Utilisateurs", href: "/admin/users", icon: UserIcon },
  { name: "Articles", href: "/admin/articles", icon: NewspaperIcon },
  { name: "Partenaires", href: "/admin/partners", icon: ShareIcon },
  { name: "Entraineurs", href: "/admin/trainers", icon: UsersIcon },
  { name: "Classement", href: "/admin/players", icon: ChartBarIcon },
  { name: "équipes", href: "/admin/teams", icon: UserGroupIcon },
];

const Sidebar = (): JSX.Element => {
  return (
    <div className="fixed top-0 bottom-0 left-0 z-50 w-64 bg-lightBlue bg-opacity-95 shadow-card text-white">
      <div className="flex flex-col items-center px-6 mt-4 mb-6">
        <img className="w-16 h-auto" src={logo} alt="Logo USM Olivet TT" />
        <h3 className="text-xl font-semibold mt-4">USM Olivet TT</h3>
      </div>
      <nav className="flex-grow p-3 border-t border-lightWhite border-opacity-10">
        <ul>
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className="inline-flex items-end w-full p-2 mt-1 rounded hover:bg-lightBlue transition duration-50 ease-in-out"
                activeClassName="text-lightRed"
                exact={item.href === "/admin"}
              >
                <item.icon className="h-6 w-6 mr-2" aria-hidden="true" />
                <span className="text-sm text-white capitalize">
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
