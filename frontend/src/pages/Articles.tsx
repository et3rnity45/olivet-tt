import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { ArticlesQuery } from '@/graphql/queries/article';
import ArticleCard from '@/components/molecules/ArticleCard';
import CategoryEnum from '@/types/CategoryEnum';
import Article from '@/types/Article';
import FilterControl from '@/components/molecules/FilterControl';
import Loading from '@/components/atoms/Loading';

const spring = {
	type: 'spring',
	damping: 25,
	stiffness: 250,
};

const Articles = (): JSX.Element => {
	const { category } = useParams<{ category: string }>();
	const { loading, error, data } = useQuery(ArticlesQuery);
	const [filter, setFilter] = useState<string | undefined>(category);
	const [filteredArticles, setFilteredArticles] = useState([]);

	useEffect(() => {
		const articles = data?.articles;
		if (articles) {
			setFilteredArticles(
				filter
					? articles.filter(
							(article: Article) => article.category.toLowerCase() === filter.toLowerCase()
					  )
					: articles
			);
		}
	}, [data, filter]);

	return (
		<section className='mx-4 py-8 lg:py-16' id='contact'>
			<div className='container mx-auto'>
				<h2 className='mb-8 lg:mb-16'>Toute l&apos;acutalité</h2>
				<FilterControl
					filter={filter}
					setFilter={setFilter}
					options={Object.values(CategoryEnum)}
					className='pl-5'
				/>
				{loading && <Loading />}
				{error && (
					<div className='flex h-96 flex-col items-center justify-center text-center text-xl'>
						<span className='mr-1 font-bold'>Erreur :</span>
						{error.message}
					</div>
				)}
				{data?.articles && (
					<AnimatePresence exitBeforeEnter>
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
							{filteredArticles.map((article: Article) => (
								<motion.div
									key={article.id}
									layout
									transition={spring}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<ArticleCard article={article} className='lg:p-6' />
								</motion.div>
							))}
						</div>
					</AnimatePresence>
				)}
			</div>
		</section>
	);
};

export default Articles;
