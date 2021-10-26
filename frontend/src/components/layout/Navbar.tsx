import React from "react";
import HamMenu from "@Components/base/HamBox/HamMenu";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";

const NavBar = (): JSX.Element => {
  return (
    <header className="fixed top-0 left-0 flex items-center w-full h-20 z-50 bg-darkBlue text-white whitespace-nowrap">
      <nav className="flex-grow flex justify-between items-center mx-6 sm:mx-8">
        <LeftNav />
        <RightNav />
        <HamMenu />
      </nav>
    </header>
  );
};

export default NavBar;
