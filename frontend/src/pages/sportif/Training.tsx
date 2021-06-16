import React from "react";
import { useQuery } from "@apollo/client";
import { RefreshIcon } from "@heroicons/react/outline";
import { TrainersQuery } from "../../graphql/queries/trainer";
import TrainerType from "../../types/Trainer";
import planning from "../../assets/background/planning.png";

const Training = (): JSX.Element => {
  const { loading, error, data } = useQuery(TrainersQuery);

  const trainerList = data?.trainers?.map((trainer: TrainerType) => (
    <div
      key={trainer.id}
      className="flex-1 flex flex-col shadow-card trainer-card rounded bg-white mx-4 mb-8"
    >
      <img
        className="rounded-t h-auto"
        src={`http://images.olivet-tt.fr/${trainer.media}`}
        alt={`${trainer.firstname} ${trainer.lastname}`}
      />
      <div className="p-10">
        <h3 className="text-xl mb-3">{`${trainer.firstname} ${trainer.lastname}`}</h3>
        <p className="font-light text-xs text-lightRed uppercase mb-1">
          Qualification
        </p>
        <p className="text-sm text-gray tracking-wider">
          {trainer.qualification}
        </p>
      </div>
    </div>
  ));

  return (
    <>
      <section className="py-16" id="planning">
        <div className="container mx-auto px-3">
          <h2 className="mb-8 lg:mb-16">Planning des entraînements</h2>
          <img
            className="mx-auto"
            src={planning}
            alt="Planning des entraînements"
          />
        </div>
      </section>
      <section className="py-16 bg-lightGray" id="entraineur">
        <div className="container mx-auto px-3">
          <h2 className="mb-8 lg:mb-16">Nos Entraîneurs</h2>
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
          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-evenly">
            {data?.trainers ? <>{trainerList}</> : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default Training;
