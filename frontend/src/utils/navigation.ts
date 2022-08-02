import reglement from '@/assets/pdf/Règlement-Officiel-2022.pdf';

const tournoi = [
	{ name: 'Tableaux', href: '/tournoi/tableaux' },
	{ name: 'Inscriptions', href: '/tournoi/inscriptions' },
	{ name: 'Réglement', href: reglement, isAsset: true },
	{ name: 'Infos Pratiques', href: '/tournoi/infos' },
];

const club = [
	{ name: 'Bureau', href: '/club/bureau' },
	{ name: 'Historique', href: '/club/historique' },
	{ name: 'Projet du club', href: '/club/projet' },
];

const sportif = [
	{ name: 'Entraînements', href: '/sportif/entrainements' },
	{ name: 'Stages', href: '/articles/stage' },
	{ name: 'Compétitions', href: '/articles/competition' },
	{ name: 'Classement', href: '/sportif/classement' },
	{ name: 'Equipes', href: '/sportif/equipes' },
];

const navigation = [
	{ name: 'Accueil', href: '/' },
	{ name: 'Tournoi', href: '#', subNav: tournoi },
	{ name: 'Actualités', href: '/articles' },
	//{ name: 'Le club', href: '#', subNav: club },
	{ name: 'Sportif', href: '#', subNav: sportif },
	{ name: 'Partenaires', href: '/partenaires' },
	{ name: 'Contact', href: '/contact' },
];

export default navigation;
