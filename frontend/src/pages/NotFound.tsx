import React from "react";
import { Link } from "react-router-dom";

const NotFound = (): JSX.Element => {
  return (
    <section className="py-16 mx-4" id="contact">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h1 className="font-extrabold text-2xl md:text-4xl lg:text-6xl mb-5 lgmb-10">
          Oups... Cette page n&apos;existe pas !
        </h1>
        <p className="text-large md:text-xlarge lg:text-xxlarge font-bold tracking-widest mb-5">
          <span>4</span>
          <span className="text-stroke text-lightRed">0</span>
          <span>4</span>
        </p>
        <h2 className="font-extrabold text-xl md:text-3xl lg:text-5xl mb-8">
          Tu peux revenir à l&apos;accueil par ici !
        </h2>
        <Link
          to="/"
          className="btn btn-outline-default btn-lg text-base md:text-lg"
        >
          Revenir au site
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
