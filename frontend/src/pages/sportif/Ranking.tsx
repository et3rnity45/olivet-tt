import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@apollo/client";
import { RefreshIcon } from "@heroicons/react/outline";
import { PlayersQuery } from "@Queries/player";
import PlayerType from "@Types/Player";

const Ranking = (): JSX.Element => {
  const { loading, error, data } = useQuery(PlayersQuery);
  const players = data?.players.map((player: PlayerType, index: number) => ({
    ...player,
    index: index + 1,
    fullname: `${player.nom} ${player.prenom}`,
    point: Number(player.point.toFixed(1)),
    monthEvolution: Number((player.point - player.apoint).toFixed(1)),
    yearEvolution: Number((player.point - player.valinit).toFixed(1)),
  }));

  const columns = useMemo(
    () => [
      {
        name: "#",
        selector: "index",
        sortable: true,
      },
      {
        name: "Nom prénom",
        selector: "fullname",
        sortable: true,
      },
      {
        name: "Points officiels",
        selector: "valcla",
        sortable: true,
      },
      {
        name: "Classement officiel",
        selector: "clast",
        sortable: false,
      },
      {
        name: "Points menseuls",
        selector: "point",
        sortable: true,
      },
      {
        name: "Evolution mensuelle",
        selector: "monthEvolution",
        sortable: true,
        cell: ({ monthEvolution }: { monthEvolution: number }) => {
          if (monthEvolution < 0)
            return <div className="text-red-500">{monthEvolution}</div>;
          if (monthEvolution > 0)
            return <div className="text-green-500">+{monthEvolution}</div>;
          return <div>{monthEvolution}</div>;
        },
      },
      {
        name: "Evolution annuelle",
        selector: "yearEvolution",
        sortable: true,
        cell: ({
          yearEvolution,
        }: {
          yearEvolution: number;
          monthEvolution: number;
        }) => {
          if (yearEvolution < 0)
            return <div className="text-red-500">{yearEvolution}</div>;
          if (yearEvolution > 0)
            return <div className="text-green-500">+{yearEvolution}</div>;
          return <div>{yearEvolution}</div>;
        },
      },
    ],
    []
  );

  return (
    <section className="py-16" id="planning">
      <div className="container mx-auto px-3">
        <h2 className="mb-4 lg:mb-8">Classement du Club</h2>
        {loading && (
          <div className="flex justify-center items-center h-96">
            <RefreshIcon className="h-20 w-20 animate-spin transform rotate-180" />
          </div>
        )}
        {error && (
          <div className="flex flex-col justify-center items-center text-center h-96 text-xl">
            <span className="font-bold mr-1">Erreur :</span>
            {error.message}
          </div>
        )}
        {data?.players && (
          <DataTable
            className="uppercase"
            data={players}
            columns={columns}
            striped
            pagination
            paginationPerPage={15}
            paginationRowsPerPageOptions={[15, 30, 50, 100]}
          />
        )}
      </div>
    </section>
  );
};

export default Ranking;
