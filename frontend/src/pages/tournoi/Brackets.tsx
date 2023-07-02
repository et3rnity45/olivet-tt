import React from 'react';
import affiche from '@/assets/background/affiche-2023_v2.png';

const Brackets = (): JSX.Element => {
	return (
		<section className='mx-4 py-16' id='brackets'>
			<div className='container mx-auto max-w-screen-lg'>
				<h2 className='mb-6 text-center lg:mb-12'>Les Tableaux</h2>
				<div className='flex flex-wrap space-y-16'>
					<p className='text-base lg:text-lg'>
						Découvrez les 12 tableaux du tournoi d&apos;Olivet 2023 adaptés à tous les niveaux. Vous
						êtes autorisés à participer à{' '}
						<span className='font-semibold'>3 tableaux maximum par jour</span>. A noter,{' '}
						<span className='font-semibold'>
							il est impossible de participer à deux tableaux commençant à la même heure (tableaux F
							& H, tableaux G & I, tableaux J & K).
						</span>
						. Les tableaux du samedi sont limités à 48 participants hormis le tableau dames (24).
						Les tableaux du dimanche sont limités à 24 participants hormis le tableau -1699 pts
						(36).
					</p>
					<img className='h-auto w-full rounded' src={affiche} alt='Affiche tournoi 2023' />
				</div>
			</div>
		</section>
	);
};

export default Brackets;
