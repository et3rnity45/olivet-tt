import React from 'react';
import { useQuery } from '@apollo/client';
import { RefreshIcon } from '@heroicons/react/outline';
import { BracketsQuery } from '@/graphql/queries/bracket';

const Brackets = (): JSX.Element => {
	const { loading, error, data } = useQuery(BracketsQuery);

	return (
		<section className='mx-4 py-16' id='brackets'>
			<div className='container mx-auto max-w-screen-lg'>
				<h2 className='mb-6 text-center lg:mb-12'>Les Tableaux</h2>
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
				{data?.brackets && (
					<div className='flex flex-wrap'>
						<p>
							Découvrez les 12 tableaux du tournoi d’Olivet 2022 adaptés à tous les niveaux. Vous
							êtes autorisés à participer à{' '}
							<span className='font-semibold'>3 tableaux maximum par jour</span>. A noter,{' '}
							<span className='font-semibold'>
								il est impossible de participer à la fois au tableau -1699 et au tableau Jeunes
							</span>
							. Les tableaux du samedi sont limités à 48 participants hormis le tableau dames (24).
							Les tableaux du dimanche sont limités à 24 participants hormis le tableau -1699 pts
							(36).
						</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default Brackets;
