import React from 'react';
import encart1 from '@/assets/background/encart-inscription.png';
import encart2 from '@/assets/background/encart-inscription-2.png';
import { Link } from 'react-router-dom';

const Inscriptions = (): JSX.Element => {
	return (
		<section className='mx-4 py-16' id='inscriptions'>
			<div className='container mx-auto'>
				<h2 className='mb-6 text-center lg:mb-12'>Les Inscriptions</h2>
				<div className='flex flex-col lg:flex-row'>
					<Link
						to='/tournoi/inscriptions/paiement-sur-place'
						className='group relative my-1 overflow-hidden bg-darkBlue lg:m-6'
					>
						<img
							className='h-auto w-full transition duration-400 ease-in-out group-hover:scale-110'
							src={encart1}
							alt='Inscriptions en ligne'
						/>
						<h3 className='position-center absolute w-3/4 text-center text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl xl:text-4xl'>
							Inscriptions avec paiement sur place
						</h3>
					</Link>
					<Link
						to='/tournoi/inscriptions/paiement-en-ligne'
						className='group relative my-1 overflow-hidden bg-darkBlue lg:m-6'
					>
						<img
							className='h-auto w-full transition duration-400 ease-in-out group-hover:scale-110'
							src={encart2}
							alt='Inscriptions en ligne'
						/>
						<h3 className='position-center absolute w-3/4 text-center text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl xl:text-4xl'>
							Inscriptions avec paiement en ligne
						</h3>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Inscriptions;
