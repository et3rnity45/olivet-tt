import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@apollo/client";
import { RefreshIcon } from "@heroicons/react/outline";
import { PoulesQuery } from "@Queries/poule";
import PouleType from "@Types/Poule";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const Teams = (): JSX.Element => {
  const { loading, error, data } = useQuery(PoulesQuery);

  const columns = useMemo(
    () => [
      { name: "#", selector: "clt", width: "50px" },
      { name: "équipe", selector: "equipe" },
      { name: "Points", selector: "pts", width: "70px" },
      { name: "Joué", selector: "joue", width: "70px" },
      { name: "V", selector: "vic", width: "50px" },
      { name: "N", selector: "nul", width: "50px" },
      { name: "D", selector: "def", width: "50px" },
      { name: "FF/P", selector: "pf", width: "50px" },
      { name: "PG", selector: "pg", width: "70px" },
      { name: "PP", selector: "pp", width: "70px" },
    ],
    []
  );

  return (
    <section className="py-16" id="planning">
      <div className="container mx-auto px-3 text-center lg:text-left">
        <h2 className="mb-4 lg:mb-8">Classement des Équipes</h2>
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
        {data?.poules ? (
          <Tabs>
            <TabList className="flex flex-wrap justify-center uppercase pt-8">
              {data.poules.map((poule: PouleType, index: number) => (
                <Tab
                  key={poule.id}
                  className="text-xs md:text-sm cursor-pointer p-2 mx-2 mb-2 hover:bg-lightGray"
                  selectedClassName="bg-lightRed text-white"
                >
                  équipe {index + 1}
                </Tab>
              ))}
            </TabList>
            {data.poules.map((poule: PouleType) => (
              <TabPanel key={poule.id}>
                <h3 className="text-2xl uppercase tracking-wide text-center mt-8">
                  {poule.libdivision}
                </h3>
                <DataTable
                  className="uppercase"
                  data={poule.teams}
                  columns={columns}
                  striped
                  highlightOnHover
                />
              </TabPanel>
            ))}
          </Tabs>
        ) : null}
      </div>
    </section>
  );
};

export default Teams;
