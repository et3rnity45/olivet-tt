import React from "react";
import { useQuery } from "@apollo/client";
import { RefreshIcon } from "@heroicons/react/outline";
import PartnerType from "@Types/Partner";
import { PartnersQuery } from "@Queries/partner";
import getMediaUrl from "@Utils/mediaUrl";

const Partners = (): JSX.Element => {
  const { loading, error, data } = useQuery(PartnersQuery);

  const partnerList = data?.partners?.map((partner: PartnerType) => (
    <a
      key={partner.id}
      href={partner.url}
      target="_blank"
      rel="noreferrer"
      className="partner-item"
    >
      <img
        className="partner-logo"
        src={getMediaUrl(partner.media)}
        alt={`Logo ${partner.name}`}
      />
    </a>
  ));

  return (
    <section className="py-16 mx-4" id="partners">
      <div className="container mx-auto">
        <h2 className="mb-6 lg:mb-12">Nos Partenaires</h2>
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <RefreshIcon className="h-20 w-20 animate-spin transform rotate-180" />
          </div>
        ) : null}
        {error ? (
          <div className="flex flex-col justify-center items-center text-center h-96 text-xl">
            <span className="font-bold mr-1">Erreur :</span>
            {error.message}
          </div>
        ) : null}
        {data?.partners ? (
          <div className="flex flex-wrap">{partnerList}</div>
        ) : null}
      </div>
    </section>
  );
};

export default Partners;
