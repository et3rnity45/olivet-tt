import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from '@/components/utils/ProtectedRoute';
import NotFound from '@/pages/NotFound';
import HomePage from '@/pages/HomePage';
import Article from '@/pages/Article';
import Articles from '@/pages/Articles';
import Partners from '@/pages/Partners';
import Contact from '@/pages/Contact';
import Ranking from '@/pages/sportif/Ranking';
import Teams from '@/pages/sportif/Teams';
import Training from '@/pages/sportif/Training';
import Login from '@/pages/Login';
import ArticleUpdate from '@/pages/admin/article/ArticleUpdate';
import ArticleTable from '@/pages/admin/article/ArticleTable';
import PartnerUpdate from '@/pages/admin/partner/PartnerUpdate';
import PartnerTable from '@/pages/admin/partner/PartnerTable';

const Page = (): JSX.Element => {
	const activeTournament = false;

	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/sportif/classement' element={<Ranking />} />
			<Route path='/sportif/equipes' element={<Teams />} />
			<Route path='/sportif/entrainements' element={<Training />} />
			<Route path='/partenaires' element={<Partners />} />
			<Route path='/contact' element={<Contact />} />
			<Route path='/articles/:category?' element={<Articles />} />
			<Route path='/article/:id' element={<Article />} />
			{activeTournament && (
				<>
					<Route path='/tournoi/tableaux' element={<Contact />} />
					<Route path='/tournoi/inscriptions' element={<Contact />} />
					<Route path='/tournoi/reglement' element={<Contact />} />
					<Route path='/tournoi/infos' element={<Contact />} />
				</>
			)}
			<Route path='/login' element={<Login />} />
			<Route element={<ProtectedRoute />}>
				<Route path='/admin' />
				<Route path='/admin/articles' element={<ArticleTable />} />
				<Route path='/admin/articles/create' element={<ArticleUpdate />} />
				<Route path='/admin/articles/edit/:id' element={<ArticleUpdate />} />
				<Route path='/admin/partners' element={<PartnerTable />} />
				<Route path='/admin/partners/create' element={<PartnerUpdate />} />
				<Route path='/admin/partners/edit/:id' element={<PartnerUpdate />} />
			</Route>
			<Route element={<NotFound />} />
		</Routes>
	);
};

export default Page;
