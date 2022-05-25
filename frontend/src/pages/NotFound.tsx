import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = (): JSX.Element => {
	return (
		<section className='mx-4 py-16' id='contact'>
			<div className='container mx-auto flex flex-col items-center text-center'>
				<h1 className='lgmb-10 mb-5 text-2xl font-extrabold md:text-4xl lg:text-6xl'>
					Oups... Cette page n&apos;existe pas !
				</h1>
				<p className='mb-5 text-large font-bold tracking-widest md:text-xlarge lg:text-xxlarge'>
					<span>4</span>
					<span className='text-stroke text-lightRed'>0</span>
					<span>4</span>
				</p>
				<h2 className='mb-8 text-xl font-extrabold md:text-3xl lg:text-5xl'>
					Tu peux revenir à l&apos;accueil par ici !
				</h2>
				<Link to='/' className='btn btn-outline-default btn-lg text-base md:text-lg'>
					Revenir au site
				</Link>
			</div>
		</section>
	);
};

export default NotFound;
