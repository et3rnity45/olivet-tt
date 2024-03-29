import React, { Fragment, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CreateTickets } from '@/graphql/mutations/ticket';
import InscriptionForm from '@/pages/tournoi/InscriptionForm';
import Modal from '@/components/organisms/Modal';

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
	brackets: string[];
};

const saturdayBrackets = ['A', 'B', 'C', 'D', 'E'];
const sundayBrackets = ['F', 'G', 'H', 'I', 'J', 'K', 'L'];

const OnSiteInscription = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [modalContent, setModalContent] = useState('');
	const [createTickets] = useMutation(CreateTickets);

	const handleSubmit = async (inscriptionInput: InscriptionInput) => {
		const { firstname, lastname, email, phone, licence, brackets } = inscriptionInput;
		const selectedBrackets: string[] = [];
		for (const [key, value] of Object.entries(brackets)) {
			if (value) {
				selectedBrackets.push(key.substring(key.length - 1).toUpperCase());
			}
		}
		if (selectedBrackets.length < 1) {
			setTitle('Erreur dans le formulaire');
			setModalContent('Vous devez séléctionner au moins un tableau !');
		} else if (
			saturdayBrackets.reduce((a, c) => a + (selectedBrackets.includes(c) ? 1 : 0), 0) > 3 ||
			sundayBrackets.reduce((a, c) => a + (selectedBrackets.includes(c) ? 1 : 0), 0) > 3
		) {
			setTitle('Erreur dans le formulaire');
			setModalContent('Vous ne pouvez pas séléctionner plus de 3 tableaux par jour !');
		} else if (selectedBrackets.includes('K') && selectedBrackets.includes('L')) {
			setTitle('Erreur dans le formulaire');
			setModalContent('Vous ne pouvez pas séléctionner les tableaux L & K en même temps !');
		} else if (selectedBrackets.includes('F') && selectedBrackets.includes('H')) {
			setTitle('Erreur dans le formulaire');
			setModalContent('Vous ne pouvez pas séléctionner les tableaux F & H en même temps !');
		} else if (selectedBrackets.includes('G') && selectedBrackets.includes('I')) {
			setTitle('Erreur dans le formulaire');
			setModalContent('Vous ne pouvez pas séléctionner les tableaux G & I en même temps !');
		} else if (selectedBrackets.includes('J') && selectedBrackets.includes('K')) {
			setTitle('Erreur dans le formulaire');
			setModalContent('Vous ne pouvez pas séléctionner les tableaux J & K en même temps !');
		} else {
			setTitle('Inscription validée');
			setModalContent(
				'Votre inscription a été soumise avec succès. Vous allez recevoir un e-mail validant votre ' +
					'participation au tournoi.'
			);
			const tickets = selectedBrackets.map((bracket) => {
				return {
					firstname,
					lastname,
					email,
					phone,
					licence: parseInt(licence),
					bracket,
					hasPaid: false,
				};
			});
			await createTickets({ variables: { input: tickets } });
			setIsOpen(true);
			return true;
		}
		setIsOpen(true);
		return false;
	};

	return (
		<>
			<section className='mx-4 py-16' id='inscriptions'>
				<div className='container mx-auto max-w-screen-xl'>
					<h2 className='mb-6 text-center lg:mb-12'>Inscriptions avec paiement sur place</h2>
					<p className='mb-3'>
						Remplissez ce formulaire avec vos informations et les tableaux auxquels vous souhaitez
						participer. Vous effectuerez le paiement des tableaux sur place en espèce ou en chèque.
					</p>
					<p className='mb-3'>
						Vous êtes autorisés à participer à
						<span className='ml-1 font-semibold'>3 tableaux maximum par jour</span>. A noter,
						<span className='ml-1 font-semibold'>
							il est impossible de participer à la fois aux tableaux K et L ainsi qu&apos;aux
							tableaux commencant à la même heure (tableaux F & H, tableaux G & I, tableaux J & K)
						</span>
						. Les tableaux du samedi sont limités à 48 participants hormis le tableau dames (24).
						Les tableaux du dimanche sont limités à 24 participants hormis le tableau -1699 pts
						(36).
					</p>
					<p className='mb-5'>
						Votre inscription est confirmée lorsque vous recevez un mail de notre part !
					</p>
					<InscriptionForm onSubmit={handleSubmit} />
				</div>
			</section>

			<Modal title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
				{modalContent}
			</Modal>
		</>
	);
};

export default OnSiteInscription;
