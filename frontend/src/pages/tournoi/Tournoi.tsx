import React from 'react';
import { NavLink } from 'react-router-dom';
import figure1 from '@/assets/background/antoine.jpg';
import figure2 from '@/assets/background/paul.jpg';
import figure3 from '@/assets/background/jsp.jpg';

const Tournoi = (): JSX.Element => {
	return (
		<section className='mx-4 py-16' id='brackets'>
			<div className='container mx-auto max-w-screen-xl'>
				<h2 className='mb-3 text-center lg:mb-6'>Tournoi Olivet 2022</h2>
				<h3 className='mb-6 text-center text-xl font-bold text-gray-600 md:text-2xl lg:mb-12 lg:text-3xl'>
					12 tableaux et plus de 2000€ de dotation les 10 & 11 septembre !
				</h3>
				<div className='grid grid-cols-1 gap-16 pt-12 lg:pt-24 xl:grid-cols-2'>
					<div className='my-auto space-y-5 xl:space-y-10'>
						<h4 className='mb-6 text-center text-lg font-bold md:text-xl lg:mb-12 lg:text-2xl'>
							Tournoi Olivet 2022 !
						</h4>
						<p className='lg:text-lg'>
							Olivet Tennis de Table est fier d&apos;organiser la cinquième édition de son tournoi
							de <span className='font-semibold'>Nationale B et ses 2000€ de dotation</span>.
						</p>
						<p className='lg:text-lg'>
							Après le succès des quatre premières éditions, c&apos;est reparti pour 2 jours de
							compétition les <span className='font-semibold'>10 & 11 septembre 2022 !</span>
						</p>
						<p className='lg:text-lg'>
							Avec <span className='font-semibold'>12 tableaux</span>, vous pourrez vous mesurer aux
							adversaires de votre niveau en ce début de saison 2022/2023. Un rendez-vous convivial
							avec de nombreuses animations et la possibilité de se restaurer.
						</p>
						<p className='mb-6 lg:mb-10 lg:text-lg'>
							Le tennis de table féminin est également à l&apos;honneur avec un tableau dédié aux
							dames. Le tournoi se déroulera au{' '}
							<span className='font-semibold'>Gymnase de l&apos;Orbellière à Olivet</span>, à 1h30
							de route de Paris.
						</p>
						<div className='space-x-6 text-center lg:text-left'>
							<NavLink
								to='/tournoi/tableaux'
								className='inline-flex justify-center rounded-md border border-transparent bg-lightBlue py-2 px-4 text-sm font-medium text-white shadow-sm transition duration-200 ease-in-out hover:bg-darkBlue focus:outline-none focus:ring-2 focus:ring-darkBlue focus:ring-offset-2 lg:text-base'
							>
								Voir les tableaux
							</NavLink>
							<NavLink
								to='/tournoi/inscriptions'
								className='inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm transition duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 lg:text-base'
							>
								Je participe !
							</NavLink>
						</div>
					</div>
					<div className='hidden grid-flow-col grid-cols-5 gap-6 xl:grid'>
						<div className='col-span-3 row-span-4'>
							<img className='h-full object-cover' src={figure1} />
						</div>
						<div className='col-span-2 row-span-2'>
							<img src={figure2} />
						</div>
						<div className='col-span-2 row-span-2'>
							<img src={figure3} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Tournoi;
