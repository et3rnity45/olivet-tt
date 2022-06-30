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
					Les paiements se font via HelloAsso qui est une plateforme de paiement sécurisé. Hello
					Asso vous envoie automatiquement un billet avec un QR code par mail mais{' '}
					<span className='font-bold'> vous n’avez pas besoin</span> de nous le fournir le jour du
					tournoi. Nous vous demanderons simplement votre licence.
				</p>
				<p className='mb-16 text-lg font-semibold'>
					Si le tableau auquel vous souhaitez vous inscrire ne s’affiche pas c’est que celui-ci est
					complet ! Rendez-vous dans la rubrique «
					<Link
						to='/tournoi/inscriptions/paiement-sur-place'
						className='mx-1 text-lighterRed underline'
					>
						Inscriptions avec paiement sur place
					</Link>
					» pour vous inscrire sur la liste d’attente.
				</p>
				<iframe
					id='haWidget'
					className='h-screen w-full'
					src='https://www.helloasso.com/associations/usm-olivet-tennis-de-table/evenements/tournoi-olivet-2022/widget'
				/>
			</div>
		</section>
	);
};

export default OnlineInscription;
