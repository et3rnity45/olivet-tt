import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Gym } from "../../assets/icons/gym.svg";
import { ReactComponent as PingPong } from "../../assets/icons/ping-pong.svg";
import { ReactComponent as Trophy } from "../../assets/icons/trophy.svg";

export const activities = [
  {
    name: "Entraînements",
    link: "/sportif/entrainements",
    svg: <Gym height="60" width="60" className="fill-current" />,
    description:
      "Renseignez vous sur les différents créneaux d'entraînements mis à votre disposition par le club",
  },
  {
    name: "Stages",
    link: "/articles",
    svg: <PingPong height="60" width="60" className="fill-current" />,
    description:
      "Découvrez les stages proposés par le club pour occuper les enfants durant les vacances",
  },
  {
    name: "Compétitions",
    link: "/articles",
    svg: <Trophy height="60" width="60" className="fill-current" />,
    description:
      "Consultez les annonces et les résultats des différentes compétitions auquelles le club participe",
  },
];

const Discover = (): JSX.Element => {
  return (
    <section className="py-16" id="discover">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row">
          {activities.map((activity) => {
            return (
              <Link
                className="flex-1 flex flex-col items-center p-10 mx-4 hover:shadow-card hover:text-lightRed focus:shadow-card focus:text-lightRed rounded-lg transition-all duration-400"
                to={activity.link}
                key={activity.name}
              >
                {activity.svg}
                <h3 className="text-xl text-black uppercase mt-5">
                  {activity.name}
                </h3>
                <p className="font-extralight text-center text-black mt-5">
                  {activity.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Discover;
