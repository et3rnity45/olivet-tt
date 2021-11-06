import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "@Components/organisms/Footer";
import Navbar from "@Components/organisms/Navbar";
import Page from "@Pages/Page";
import Sidebar from "@Components/organisms/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App(): JSX.Element {
  const isAdmin = useLocation().pathname.startsWith("/admin");

  if (isAdmin)
    return (
      <div className="App">
        <Sidebar />
        <main id="content" className="ml-64 min-h-screen bg-gray-100">
          <Page />
          <ToastContainer />
        </main>
      </div>
    );

  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar />
      <main id="content" className="pt-20 flex-1 overflow-hidden">
        <Page />
      </main>
      <Footer />
    </div>
  );
}

export default App;
