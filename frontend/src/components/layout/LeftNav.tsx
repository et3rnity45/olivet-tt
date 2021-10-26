import React from "react";
import logo from "@Assets/logo/olivet-tt.png";
import { Link } from "react-router-dom";

const LeftNav = (): JSX.Element => {
  return (
    <Link className="flex justify-center items-center p-2" to="/">
      <img className="h-16 mr-3" src={logo} alt="Olivet TT Logo" />
      <p className="text-2xl font-medium">Olivet TT</p>
    </Link>
  );
};

export default LeftNav;
