import React from "react";
import Discover from "@Components/organisms/Discover";
import News from "@Components/organisms/News";
import Hero from "@Components/organisms/Hero";

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
