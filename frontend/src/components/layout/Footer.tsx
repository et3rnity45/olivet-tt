import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { RefreshIcon } from "@heroicons/react/outline";
import { PartnersQuery } from "@Queries/partner";
import PartnerType from "@Types/Partner";

const Footer = (): JSX.Element => {
  const { loading, error, data } = useQuery(PartnersQuery);

  return (
    <footer className="bg-darkBlue">
      <section id="partners" className="py-14">
        <div className="container mx-auto">
          <h2 className="text-center text-white mb-16">Nos Partenaires</h2>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <RefreshIcon className="h-20 w-20 animate-spin transform rotate-180" />
            </div>
          ) : null}
          {error ? (
            <div className="flex flex-col justify-center items-center text-center h-32 text-xl">
              <span className="font-bold mr-1">Erreur :</span>
              {error.message}
            </div>
          ) : null}
          <div className="flex justify-center items-center flex-middle flex-wrap">
            {data?.partners?.map((partner: PartnerType) => (
              <Link className="p-8" to="/partenaires" key={partner.id}>
                <img
                  className="white-filter logo-max align-middle"
                  src={`http://images.olivet-tt.fr/${partner.media}`}
                  alt={partner.name}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <hr className="text-lightWhite" />
      <section id="copyright" className="">
        <p className="text-center text-gray p-10">
          &copy; {new Date().getFullYear()}, USM Olivet TT. Tous droits
          réservés.
          <Link className="ml-3 hover:text-lightWhite" to="/cgu">
            Conditions d&apos;utilisation
          </Link>
        </p>
      </section>
    </footer>
  );
};

export default Footer;
