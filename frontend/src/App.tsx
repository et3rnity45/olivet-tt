import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "@Components/layout/Footer";
import Navbar from "@Components/layout/Navbar";
import Page from "@Pages/Page";
import Sidebar from "@Components/layout/Sidebar";

function App(): JSX.Element {
  const isHome = useLocation().pathname === "/";
  const isAdmin = useLocation().pathname.startsWith("/admin");

  if (isAdmin)
    return (
      <div className="App">
        <Sidebar />
        <main id="content" className="ml-64">
          <Page />
        </main>
      </div>
    );

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
