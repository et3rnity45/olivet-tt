import reglement from '@/assets/pdf/Règlement-Officiel-2022.pdf';

const club = [
	{ name: 'Bureau', href: '/club/bureau', isAsset: false },
	{ name: 'Historique', href: '/club/historique', isAsset: false },
	{ name: 'Projet du club', href: '/club/projet', isAsset: false },
];

const sportif = [
	{ name: 'Entraînements', href: '/sportif/entrainements', isAsset: false },
	{ name: 'Stages', href: '/articles/stage', isAsset: false },
	{ name: 'Compétitions', href: '/articles/competition', isAsset: false },
	{ name: 'Classement', href: '/sportif/classement', isAsset: false },
	{ name: 'Equipes', href: '/sportif/equipes', isAsset: false },
];

const tournoi = [
	{ name: 'Tableaux', href: '/tournoi/tableaux', isAsset: false },
	{ name: 'Inscriptions', href: '/tournoi/inscriptions', isAsset: false },
	{ name: 'Réglement', href: reglement, isAsset: true },
	{ name: 'Infos Pratiques', href: '/tournoi/infos', isAsset: false },
];

const navigation = [
	{ name: 'Accueil', href: '/' },
	{ name: 'Tournoi', href: '#', subNav: tournoi },
	{ name: 'Actualités', href: '/articles' },
	{ name: 'Le club', href: '#', subNav: club },
	{ name: 'Sportif', href: '#', subNav: sportif },
	{ name: 'Partenaires', href: '/partenaires' },
	{ name: 'Contact', href: '/contact' },
];

export default navigation;
