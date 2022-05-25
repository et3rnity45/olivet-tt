import React from 'react';
import { ArrowRightIcon, RefreshIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Article from '@/types/Article';
import ArticleCard from '@/components/molecules/ArticleCard';
import { NewestArticles } from '@/graphql/queries/article';

const News = (): JSX.Element => {
	const { loading, error, data } = useQuery(NewestArticles);

	return (
		<section className='py-16' id='discover'>
			<div className='container mx-auto px-4'>
				<h2>Actualité du Club</h2>
				<hr className='my-10 text-lightWhite' />
				{loading && (
					<div className='flex h-96 items-center justify-center'>
						<RefreshIcon className='h-20 w-20 rotate-180 transform animate-spin' />
					</div>
				)}
				{error && (
					<div className='flex h-96 flex-col items-center justify-center text-center text-xl'>
						<span className='mr-1 font-bold'>Erreur :</span>
						{error.message}
					</div>
				)}
				{data?.newestArticles && (
					<div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-2'>
						{data.newestArticles.map((article: Article) => (
							<ArticleCard key={article.id} article={article} className='lg:p-6' />
						))}
					</div>
				)}
				<div className='mt-8'>
					<Link to='/articles' className='article-link relative float-right'>
						Voir toute l&apos;actualité
						<ArrowRightIcon className='ml-2 inline-block align-middle' height='16' />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default News;
