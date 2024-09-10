import React from 'react';
import rond1 from '@/assets/background/rond-1.png';
import rond2 from '@/assets/background/rond-2.png';
import rond3 from '@/assets/background/rond-3.png';

const Infos = (): JSX.Element => {
	return (
		<section className='mx-4 py-16' id='infos'>
			<div className='container mx-auto max-w-screen-xl'>
				<h2 className='mb-8 text-center lg:mb-16'>Infos Pratiques</h2>
				<div className='my-6 flex flex-col lg:flex-row'>
					<img className='m-3 w-80 self-center sm:w-96' src={rond3} alt='Asset 1' />
					<div className='m-3'>
						<h3 className='mb-3 text-xl md:text-2xl lg:mb-6 lg:text-3xl'>Dates et lieu</h3>
						<p className='mb-3 lg:mb-5'>
							Le tournoi se déroulera les 14 & 15 septembre 2024 au Gymnase de l’Orbellière à Olivet
							!
						</p>
						<p className='mb-3 lg:mb-5'>
							Gymnase de l’Orbellière :
							<a
								href='https://goo.gl/maps/gFCJJUT5HP1okysY7'
								target='_blank'
								rel='noopener noreferrer'
								className='ml-1 text-lighterRed underline'
							>
								199 Rue des Cireries, 45160 Olivet
							</a>
						</p>
						<p className='mb-3 lg:mb-5'>
							Si vous venez de Paris en voiture, prenez l&apos;A10 en direction de Bordeaux. Ensuite
							récupérer l&apos;A71 et sortez à Orléans centre pour rejoindre Olivet.
						</p>
					</div>
				</div>
				<div className='my-6 flex flex-col lg:flex-row'>
					<img className='m-3 w-80 self-center sm:w-96' src={rond2} alt='Asset 2' />
					<div className='m-3'>
						<h3 className='mb-3 text-xl md:text-2xl lg:mb-6 lg:text-3xl'>Nous contacter</h3>
						<p className='mb-3 lg:mb-5'>
							Contactez <span className='font-semibold'>Julien Pawlowicz</span> qui s&apos;occupe de
							l&apos;organisation du tournoi :
						</p>
						<p className='mb-3 lg:mb-5'>
							<a href='mailto:jerome.robichon@orange.fr' className='mr-1 text-lighterRed underline'>
								julien.pawlowicz@gmail.com
							</a>
							- 06 48 78 29 10
						</p>
						<p className='mb-3 lg:mb-5'>
							Contactez <span className='font-semibold'>Olivet Tennis de Table</span> :
						</p>
						<p className='mb-3 lg:mb-5'>
							<a href='mailto:olivet-tt@orange.fr' className='mr-1 text-lighterRed underline'>
								olivet-tt@orange.fr
							</a>
							- 02 38 66 86 88
						</p>
					</div>
				</div>
				<div className='my-6 flex flex-col lg:flex-row'>
					<img className='m-3 w-80 self-center sm:w-96' src={rond1} alt='Asset 3' />
					<div className='m-3'>
						<h3 className='mb-3 text-xl md:text-2xl lg:mb-6 lg:text-3xl'>Qui sommes-nous ?</h3>
						<p className='mb-3 lg:mb-5'>
							Olivet Tennis de Table, fort de ses 385 licenciés, est un club qui se veut performant
							et convivial ! C&apos;est avec cet état d&apos;esprit que nous organisons la septième
							édition de notre tournoi de national B. Cette compétition à taille humaine est
							l&apos;occasion de débuter la saison face à de nombreux joueurs de son niveau.
						</p>
						<p className='mb-3 lg:mb-5'>
							N&apos;hésitez pas à nous suivre sur
							<a
								href='https://www.facebook.com/usmolivetennisdetable/'
								target='_blank'
								rel='noopener noreferrer'
								className='mx-1 text-lighterRed underline'
							>
								notre page Facebook
							</a>
							pour suivre les actualités du tournoi.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Infos;
