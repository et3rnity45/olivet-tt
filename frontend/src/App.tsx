import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Page from "./pages/Page";

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
