import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "@Components/layout/Footer";
import Navbar from "@Components/layout/Navbar";
import Page from "@Pages/Page";
import Sidebar from "@Components/layout/Sidebar";

function App(): JSX.Element {
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
      <Navbar />
      <main id="content" className="mt-20 overflow-hidden">
        <Page />
      </main>
      <Footer />
    </div>
  );
}

export default App;
