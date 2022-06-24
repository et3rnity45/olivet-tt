import React, { Fragment, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Dialog, Transition } from '@headlessui/react';
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
	const [isOpen, setIsOpen] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);

	const closeModal = () => {
		setIsOpen(false);
	};

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal2 = () => {
		setIsOpen2(false);
	};

	const openModal2 = () => {
		setIsOpen2(true);
	};

	const handleSubmit = async (inscriptionInput: InscriptionInput) => {
		const { firstname, lastname, email, phone, licence, ...brackets } = inscriptionInput;
		const countedBrackets = [];
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
				await createTicket({ variables: { input } });
				countedBrackets.push(input.bracket);
			}
		}

		if (countedBrackets.length > 0) {
			openModal();
		} else {
			openModal2();
		}
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
					<p className='mb-5'>
						Votre inscription est confirmée lorsque vous recevez un mail de notre part !
					</p>
					<InscriptionForm onSubmit={handleSubmit} />
				</div>
			</section>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
									<Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
										Inscription validée
									</Dialog.Title>
									<div className='mt-2'>
										<p className='text-sm text-gray-500'>
											Votre inscription a été soumise avec succès. Vous allez recevoir un e-mail
											validant votre participation au tournoi.
										</p>
									</div>

									<div className='mt-4'>
										<button
											type='button'
											className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
											onClick={closeModal}
										>
											Compris !
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			<Transition appear show={isOpen2} as={Fragment}>
				<Dialog as='div' className='relative z-10' onClose={closeModal2}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
									<Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
										Erreur dans le formulaire
									</Dialog.Title>
									<div className='mt-2'>
										<p className='text-sm text-gray-500'>
											Vous devez séléctionner au moins un tableau !
										</p>
									</div>

									<div className='mt-4'>
										<button
											type='button'
											className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
											onClick={closeModal2}
										>
											Compris !
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default OnSiteInscription;
