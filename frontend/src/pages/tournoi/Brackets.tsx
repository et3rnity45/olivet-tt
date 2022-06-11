import React from 'react';
import { useQuery } from '@apollo/client';
import { RefreshIcon } from '@heroicons/react/outline';
import { BracketsQuery } from '@/graphql/queries/bracket';
import BracketType from '@/types/Bracket';

const Partners = (): JSX.Element => {
	const { loading, error, data } = useQuery(BracketsQuery);

	return (
		<section className='mx-4 py-16' id='partners'>
			<div className='container mx-auto'>
				<h2 className='mb-6 lg:mb-12'>Les Tableaux</h2>
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
				{data?.partners && <div className='flex flex-wrap'></div>}
			</div>
		</section>
	);
};

export default Partners;
