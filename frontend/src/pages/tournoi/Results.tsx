import React from 'react';
import { Link } from 'react-router-dom';
import tableauA from '@/assets/pdf/Tableau_A.pdf';
import tableauB from '@/assets/pdf/Tableau_B.pdf';
import tableauC from '@/assets/pdf/Tableau_C.pdf';
import tableauD from '@/assets/pdf/Tableau_D.pdf';
import tableauF from '@/assets/pdf/Tableau_F.pdf';
import tableauG from '@/assets/pdf/Tableau_G.pdf';
import tableauH from '@/assets/pdf/Tableau_H.pdf';
import tableauI from '@/assets/pdf/Tableau_I.pdf';
import tableauJ from '@/assets/pdf/Tableau_J.pdf';
import tableauK from '@/assets/pdf/Tableau_K.pdf';
import tableauL from '@/assets/pdf/Tableau_L.pdf';
import podium from '@/assets/background/podium.jpg';

const tableaux = [
	{ name: 'Tableau A', to: tableauA },
	{ name: 'Tableau B', to: tableauB },
	{ name: 'Tableau C', to: tableauC },
	{ name: 'Tableau D', to: tableauD },
	{ name: 'Tableau F', to: tableauF },
	{ name: 'Tableau G', to: tableauG },
	{ name: 'Tableau H', to: tableauH },
	{ name: 'Tableau I', to: tableauI },
	{ name: 'Tableau J', to: tableauJ },
	{ name: 'Tableau K', to: tableauK },
	{ name: 'Tableau L', to: tableauL },
];

const Results = (): JSX.Element => {
	return (
		<section className='px-4 py-16' id='results'>
			<div className='container mx-auto'>
				<h2 className='mb-6 text-center lg:mb-12'>Les Résultats</h2>
				<div className='flex justify-center'>
					<img src={podium} alt='Podium' className='h-[600px]' />
				</div>
				<div className='grid grid-cols-4 gap-4 pt-16'>
					{tableaux.map((tableau) => (
						<Link
							key={tableau.name}
							to={tableau.to}
							target='_blank'
							rel='noreferrer'
							className='rounded-md bg-lightBlue py-20 text-center text-xl font-semibold text-white shadow-md hover:text-lighterRed'
						>
							{tableau.name}
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default Results;
