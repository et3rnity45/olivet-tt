import React, { useState } from 'react';
import useScript from '@/hooks/useScript';
import Loading from '@/components/atoms/Loading';

const Players = (): JSX.Element => {
	useScript('https://www.pongiste.fr/include/js/jquery.min.js');
	useScript(
		'https://www.pongiste.fr/include/setIframeHeight-master/dist/set-iframe-height-parent.js'
	);

	const [loading, setLoading] = useState(true);

	return (
		<section className='py-16' id='planning'>
			<div className='container mx-auto px-3'>
				<h2 className='mb-8 lg:mb-16'>Les joueurs du club</h2>
				{loading && <Loading />}
				<iframe
					src='https://www.pongiste.fr/include/pages/joueurs.php?num_club=04450410&affichage=tableaux&tri=points&color=0475b7'
					width='100%'
					height='100%'
					onLoad={() => setLoading(false)}
				></iframe>
			</div>
		</section>
	);
};

export default Players;
