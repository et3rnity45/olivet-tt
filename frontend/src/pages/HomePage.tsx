import React from "react";
import Discover from "@Components/sections/Discover";
import News from "@Components/sections/News";
import Hero from "@Components/sections/Hero";

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
