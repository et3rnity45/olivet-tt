import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from '@/components/utils/ProtectedRoute';
import NotFound from '@/pages/NotFound';
import HomePage from '@/pages/HomePage';
import Article from '@/pages/Article';
import Articles from '@/pages/Articles';
import Partners from '@/pages/Partners';
import Contact from '@/pages/Contact';
import Statistics from '@/pages/sportif/Statistics';
import Players from '@/pages/sportif/Players';
import Teams from '@/pages/sportif/Teams';
import Training from '@/pages/sportif/Training';
import Tournoi from '@/pages/tournoi/Tournoi';
import Brackets from '@/pages/tournoi/Brackets';
import Inscriptions from '@/pages/tournoi/Inscriptions';
import OnSiteInscription from '@/pages/tournoi/OnSiteInscription';
import OnlineInscription from '@/pages/tournoi/OnlineInscription';
import Results from '@/pages/tournoi/Results';
import Infos from '@/pages/tournoi/Infos';
import Login from '@/pages/Login';
import ArticleUpdate from '@/pages/admin/article/ArticleUpdate';
import ArticleTable from '@/pages/admin/article/ArticleTable';
import PartnerUpdate from '@/pages/admin/partner/PartnerUpdate';
import PartnerTable from '@/pages/admin/partner/PartnerTable';
import TicketTable from '@/pages/admin/tournoi/TicketTable';

const Page = (): JSX.Element => {
	const activeTournament = true;

	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			{activeTournament && (
				<Route path='/tournoi'>
					<Route path='' element={<Tournoi />} />
					<Route path='tableaux' element={<Brackets />} />
					<Route path='inscriptions'>
						<Route path='' element={<Inscriptions />} />
						{/* <Route path='paiement-sur-place' element={<OnSiteInscription />} /> */}
						<Route path='paiement-en-ligne' element={<OnlineInscription />} />
					</Route>
					<Route path='infos' element={<Infos />} />
					<Route path='resultats' element={<Results />} />
				</Route>
			)}
			<Route path='/articles'>
				<Route path=':category' element={<Articles />} />
				<Route path='' element={<Articles />} />
			</Route>
			<Route path='/article/:id' element={<Article />} />
			<Route path='/sportif'>
				<Route path='statistiques' element={<Statistics />} />
				<Route path='joueurs' element={<Players />} />
				<Route path='equipes' element={<Teams />} />
				<Route path='entrainements' element={<Training />} />
			</Route>
			<Route path='/partenaires' element={<Partners />} />
			<Route path='/contact' element={<Contact />} />
			<Route path='/login' element={<Login />} />

			<Route path='/admin' element={<ProtectedRoute />}>
				<Route path='' element={<TicketTable />} />
				<Route path='articles' element={<ArticleTable />} />
				<Route path='articles/create' element={<ArticleUpdate />} />
				<Route path='articles/edit/:id' element={<ArticleUpdate />} />
				<Route path='partners' element={<PartnerTable />} />
				<Route path='partners/create' element={<PartnerUpdate />} />
				<Route path='partners/edit/:id' element={<PartnerUpdate />} />
				<Route path='tournoi'>
					<Route path='tickets' element={<TicketTable />} />
				</Route>
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};

export default Page;
