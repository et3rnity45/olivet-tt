import reglement from '@/assets/pdf/Reglement-Officiel-2024.pdf';

const tournoi = [
	{ name: 'Tableaux', href: '/tournoi/tableaux', isAsset: false },
	{ name: 'Résultats', href: '/tournoi/resultats', isAsset: false },
	//{ name: 'Inscriptions', href: '/tournoi/inscriptions/paiement-en-ligne', isAsset: false },
	{ name: 'Réglement', href: reglement, isAsset: true },
	{ name: 'Infos Pratiques', href: '/tournoi/infos', isAsset: false },
];

const club = [
	{ name: 'Bureau', href: '/club/bureau', isAsset: false },
	{ name: 'Historique', href: '/club/historique', isAsset: false },
	{ name: 'Projet du club', href: '/club/projet', isAsset: false },
];

const sportif = [
	{ name: 'Entraînements', href: '/sportif/entrainements', isAsset: false },
	{ name: 'Stages', href: '/articles/stage', isAsset: false },
	{ name: 'Compétitions', href: '/articles/competition', isAsset: false },
	{ name: 'Joueurs', href: '/sportif/joueurs', isAsset: false },
	{ name: 'Equipes', href: '/sportif/equipes', isAsset: false },
	{ name: 'Statistiques', href: '/sportif/statistiques', isAsset: false },
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
