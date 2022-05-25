import React from 'react';
import dayjs from 'dayjs';
import { CalendarIcon } from '@heroicons/react/outline';
import Badge from '@/components/atoms/Badge';
import getMediaUrl from '@/utils/mediaUrl';
import Article from '@/types/Article';

type ArticleContentProps = {
	article: Article;
};

const ArticleContent = ({ article }: ArticleContentProps): JSX.Element => {
	return (
		<article>
			<div className='aspect-w-16 aspect-h-9 mb-8 overflow-hidden lg:mb-16'>
				<img className='object-cover' src={getMediaUrl(article.media)} alt={article.id} />
			</div>
			<div className='mx-0 mb-6 md:mx-5 lg:mx-20'>
				<Badge text={article.category} />
				<h1 className='mb-6 text-3xl font-bold tracking-widest text-black lg:text-5xl'>
					{article.title}
				</h1>
				<div className='flex items-center'>
					<CalendarIcon className='mr-2 h-5' />
					<span className='uppercase'>{dayjs(article.createdAt).format('D MMMM, YYYY')}</span>
				</div>
			</div>
			<div
				className='prose prose-sm prose-red mx-0 mt-8 max-w-none md:prose-lg md:mx-5 lg:mx-20'
				dangerouslySetInnerHTML={{ __html: article.content }}
			/>
		</article>
	);
};

export default ArticleContent;
