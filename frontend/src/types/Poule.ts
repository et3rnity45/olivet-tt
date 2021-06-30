import Team from "./Team";

type PouleType = {
  id: string;
  libequipe: string;
  libdivision: string;
  liendivision: string;
  teams: [Team];
};

export default PouleType;
