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
    point: Number(player.point.toFixed(2)),
    evolution: Number((player.point - player.valcla).toFixed(2)),
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
      },
      {
        name: "Points menseuls",
        selector: "point",
        sortable: true,
      },
      {
        name: "Evolution mensuelle",
        selector: "evolution",
        sortable: true,
        cell: ({ evolution }: { evolution: number }) => {
          return evolution < 0 ? (
            <div className="text-red-500">{evolution}</div>
          ) : (
            <div className="text-green-500">+{evolution}</div>
          );
        },
      },
    ],
    []
  );

  return (
    <section className="py-16" id="planning">
      <div className="container mx-auto px-3">
        <h2 className="mb-4 lg:mb-8">Classement du Club</h2>
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
        {data?.players ? (
          <DataTable
            className="uppercase"
            data={players}
            columns={columns}
            striped
            pagination
            paginationPerPage={15}
            paginationRowsPerPageOptions={[15, 30, 50, 100]}
            highlightOnHover
          />
        ) : null}
      </div>
    </section>
  );
};

export default Ranking;
