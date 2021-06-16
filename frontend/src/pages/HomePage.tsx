import React from "react";
import Discover from "../components/sections/Discover";
import News from "../components/sections/News";
import Hero from "../components/sections/Hero";

const HomePage = (): JSX.Element => {
  return (
    <>
      <Hero />
      <News />
      <Discover />
    </>
  );
};

export default HomePage;
