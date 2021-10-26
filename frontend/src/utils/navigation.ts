const firstSubNav = [
  { name: "Bureau", href: "/club/bureau", subNav: null },
  { name: "Historique", href: "/club/historique", subNav: null },
  { name: "Projet du club", href: "/club/projet", subNav: null },
];

const secondSubNav = [
  { name: "Entraînements", href: "/sportif/entrainements", subNav: null },
  { name: "Stages", href: "/articles/stage", subNav: null },
  { name: "Compétitions", href: "/articles/competition", subNav: null },
  { name: "Classement", href: "/sportif/classement", subNav: null },
  { name: "Equipes", href: "/sportif/equipes", subNav: null },
];

const navigation = [
  { name: "Accueil", href: "/", subNav: null },
  { name: "Actualités", href: "/articles", subNav: null },
  { name: "Le club", href: "#", subNav: firstSubNav },
  { name: "Sportif", href: "#", subNav: secondSubNav },
  { name: "Partenaires", href: "/partenaires", subNav: null },
  { name: "Contact", href: "/contact", subNav: null },
];

export default navigation;
