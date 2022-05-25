import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import Article from '@/types/Article';
import getMediaUrl from '@/utils/mediaUrl';
import Badge from '@/components/atoms/Badge';

type ArticleCardProps = {
	article: Article;
	className?: string;
};

const ArticleCard = ({ article, className = '' }: ArticleCardProps): JSX.Element => {
	return (
		<article className={`h-full ${className}`}>
			<Link
				to={`/article/${article.id}`}
				className='group flex h-full flex-col transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-2xl'
			>
				<div className='aspect-w-16 aspect-h-9 overflow-hidden rounded-t-lg'>
					<img
						src={getMediaUrl(article.media)}
						alt={article.title}
						className='object-cover transition duration-400 ease-in-out group-hover:scale-110'
					/>
				</div>
				<div className='flex flex-col items-center py-6'>
					<Badge text={article.category} />
					<h3 className='mb-2 break-words text-center text-2xl font-semibold line-clamp-2'>
						{article.title}
					</h3>
					<span className='mb-2 py-2 font-medium text-gray-500'>
						{dayjs(article.createdAt).fromNow()}
					</span>
				</div>
			</Link>
		</article>
	);
};

export default ArticleCard;
