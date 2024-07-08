import React from 'react';
import waveBottom from '@/assets/background/wave-bottom.svg';
import heroTournoi from '@/assets/background/banniere_olivet.png';

const Hero = (): JSX.Element => {
	return (
		<section id='hero' className='relative bg-darkBlue'>
			<img
				className='max-h-[800px] w-full object-cover'
				src={heroTournoi}
				alt='Bannière Olivet Tennis de Table'
			/>
			{/* <h1 className='position-center absolute whitespace-nowrap text-2xl font-bold uppercase tracking-wide text-white md:text-4xl lg:text-6xl xl:text-8xl'>
				Olivet Tennis de Table
			</h1> */}
			<img
				src={waveBottom}
				alt='Wave Bottom'
				className='absolute left-0 top-auto right-0 -bottom-px z-10 h-8 w-full lg:h-16 xl:h-24'
			/>
		</section>
	);
};

export default Hero;
