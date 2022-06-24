import React from 'react';
import { useMutation } from '@apollo/client';
import { CreateTicket } from '@/graphql/mutations/ticket';
import InscriptionForm from '@/pages/tournoi/InscriptionForm';

export type ArticleInput = {
	email: string;
	firstname?: File[];
	content: string;
};

export type InscriptionInput = {
	lastname: string;
	firstname: string;
	licence: string;
	email: string;
	phone: string;
};

const OnSiteInscription = (): JSX.Element => {
	const [createTicket] = useMutation(CreateTicket);

	const handleSubmit = async (inscriptionInput: InscriptionInput) => {
		const { firstname, lastname, email, phone, licence, ...brackets } = inscriptionInput;
		for (const [key, value] of Object.entries(brackets)) {
			if (value) {
				const input = {
					firstname,
					lastname,
					email,
					phone,
					licence: parseInt(licence),
					bracket: key.substring(key.length - 1).toUpperCase(),
					hasPaid: false,
				};
				console.log(input);
				await createTicket({ variables: { input } });
			}
		}
	};

	return (
		<section className='mx-4 py-16' id='inscriptions'>
			<div className='container mx-auto max-w-screen-xl'>
				<h2 className='mb-6 text-center lg:mb-12'>Inscriptions avec paiement sur place</h2>
				<p className='mb-3'>
					Remplissez ce formulaire avec vos informations et les tableaux auxquels vous souhaitez
					participer. Vous effectuerez le paiement des tableaux sur place en espèce ou en chèque.
				</p>
				<p className='mb-5'>
					Votre inscription est confirmée lorsque vous recevez un mail de notre part !
				</p>
				<InscriptionForm onSubmit={handleSubmit} />
			</div>
		</section>
	);
};

export default OnSiteInscription;
