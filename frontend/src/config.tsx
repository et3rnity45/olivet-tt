const navLinks = [
  {
    name: "Accueil",
    href: "/",
    subLinks: null,
  },
  {
    name: "Actualités",
    href: "/articles",
    subLinks: null,
  },
  {
    name: "Le club",
    href: "/#",
    subLinks: [
      {
        name: "Bureau",
        href: "/club/bureau",
      },
      {
        name: "Historique",
        href: "/club/historique",
      },
      {
        name: "Projet du club",
        href: "/club/projet",
      },
    ],
  },
  {
    name: "Sportif",
    href: "/#",
    subLinks: [
      {
        name: "Entraînements",
        href: "/sportif/entrainements",
      },
      {
        name: "Stages",
        href: "/articles/stage",
      },
      {
        name: "Compétitions",
        href: "/articles/competition",
      },
      {
        name: "Classement",
        href: "/sportif/classement",
      },
      {
        name: "Equipes",
        href: "/sportif/equipes",
      },
    ],
  },
  {
    name: "Partenaires",
    href: "/partenaires",
    subLinks: null,
  },
  {
    name: "Contact",
    href: "/contact",
    subLinks: null,
  },
];

export default navLinks;
