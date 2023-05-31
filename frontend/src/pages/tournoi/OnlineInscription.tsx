import React from 'react';
import { Link } from 'react-router-dom';

const OnlineInscription = (): JSX.Element => {
	return (
		<section className='mx-4 py-16' id='inscriptions'>
			<div className='container mx-auto max-w-screen-lg'>
				<h2 className='mb-6 text-center lg:mb-12'>Inscriptions en ligne</h2>
				<p className='mb-5'>
					Pour vous inscrire, indiquez « 1 » en face des tableaux auxquels vous souhaitez
					participer. Vous êtes obligés de renseigner vos informations pour chaque tableau auquel
					vous participez.
				</p>
				<p className='mb-5'>
					Les paiements se font via HelloAsso qui est une plateforme de paiement sécurisé. HelloAsso
					vous envoie automatiquement un mail de confirmation après le paiement qui confirme votre
					inscription au tournoi.
				</p>
				<p className='mb-3'>
					Vous êtes autorisés à participer à
					<span className='ml-1 font-semibold'>3 tableaux maximum par jour</span>. A noter,
					<span className='ml-1 font-semibold'>
						il est impossible de participer à la fois aux tableaux K et L ainsi qu&apos;aux tableaux
						commencant à la même heure (tableaux F & H, tableaux G & I, tableaux J & K)
					</span>
					. Les tableaux du samedi sont limités à 48 participants hormis le tableau dames (24). Les
					tableaux du dimanche sont limités à 24 participants hormis le tableau -1699 pts (36).
				</p>
				{/* <p className='mb-16 text-lg font-semibold'>
					Si le tableau auquel vous souhaitez vous inscrire ne s’affiche pas c’est que celui-ci est
					complet ! Rendez-vous dans la rubrique «
					<Link
						to='/tournoi/inscriptions/paiement-sur-place'
						className='mx-1 text-lighterRed underline'
					>
						Inscriptions avec paiement sur place
					</Link>
					» pour vous inscrire sur la liste d’attente.
				</p> */}
				<iframe
					id='haWidget'
					className='mt-12 h-screen w-full'
					src='https://www.helloasso.com/associations/usm-olivet-tennis-de-table/evenements/tournoi-olivet-2023/widget'
				/>
			</div>
		</section>
	);
};

export default OnlineInscription;
