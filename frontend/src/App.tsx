import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "@Components/layout/Footer";
import Navbar from "@Components/layout/Navbar";
import Page from "@Pages/Page";

function App(): JSX.Element {
  const isHome = useLocation().pathname === "/";

  return (
    <div className="App">
      <Navbar transparent={isHome} />
      <main id="content">
        <Page />
      </main>
      <Footer />
    </div>
  );
}

export default App;