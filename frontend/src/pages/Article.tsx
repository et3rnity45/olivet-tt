import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ArticleQuery } from '@/graphql/queries/article';
import ArticleContent from '@/components/organisms/ArticleContent';
import NotFound from '@/pages/NotFound';
import Loading from '@/components/atoms/Loading';

const Article = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const { loading, error, data } = useQuery(ArticleQuery, {
		variables: { id },
	});

	return (
		<section className='mx-4 py-8 lg:py-16' id='article'>
			<div className='article-container mx-auto'>
				{loading && <Loading />}
				{error && <NotFound />}
				{data?.article && <ArticleContent article={data?.article} />}
			</div>
		</section>
	);
};

export default Article;
