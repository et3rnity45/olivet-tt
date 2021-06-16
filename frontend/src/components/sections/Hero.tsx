import React from "react";
import heroBackground from "../../assets/background/hero-banner.jpg";
import waveBottom from "../../assets/background/wave-bottom.svg";

const Hero = (): JSX.Element => {
  return (
    <section id="hero" className="relative bg-darkBlue">
      <img
        className="w-full h-auto"
        src={heroBackground}
        alt="Bannière Olivet Tennis de Table"
      />
      <h1 className="absolute position-center text-white text-2xl md:text-4xl lg:text-6xl xl:text-8xl whitespace-nowrap font-bold tracking-wide uppercase">
        Olivet Tennis de Table
      </h1>
      <img
        src={waveBottom}
        alt="Wave Bottom"
        className="absolute left-0 top-auto right-0 -bottom-px z-10 w-full h-8 lg:h-16 xl:h-24"
      />
    </section>
  );
};

export default Hero;
