import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { InscriptionInput } from '@/pages/tournoi/OnSiteInscription';
import { BracketsQuery } from '@/graphql/queries/bracket';
import CheckboxField from '@/components/molecules/CheckboxField';
import TextField from '@/components/molecules/TextField';
import Form from '@/components/organisms/Form';
import Button from '@/components/atoms/Button';
import { RefreshIcon } from '@heroicons/react/outline';
import BracketType from '@/types/Bracket';

type InscriptionFormProps = {
	onSubmit: (data: InscriptionInput) => Promise<void>;
};

const InscriptionForm = ({ onSubmit }: InscriptionFormProps): JSX.Element => {
	const methods = useForm<InscriptionInput>();
	const { data, loading, error } = useQuery(BracketsQuery);

	const handleSubmit = async (data: InscriptionInput) => {
		await onSubmit(data)
			.then(() => methods.reset(data))
			.catch((err) => console.error(err));
	};
	return (
		<FormProvider {...methods}>
			<Form onSubmit={methods.handleSubmit(handleSubmit)}>
				<Form.InputList>
					<TextField
						className='col-span-full lg:col-span-3'
						name='firstname'
						label='Prénom'
						type='text'
						placeholder='Jacques'
						required
					/>
					<TextField
						className='col-span-full lg:col-span-3'
						name='lastname'
						label='Nom'
						type='text'
						placeholder='Dupont'
						required
					/>
					<TextField
						className='col-span-full lg:col-span-3'
						name='email'
						label='E-mail'
						type='email'
						placeholder='jacques.dupont@gmail.com'
						required
					/>
					<TextField
						className='col-span-full lg:col-span-3'
						name='phone'
						label='Numéro de téléphone'
						type='tel'
						placeholder='01 23 45 67 89'
						required
					/>
					<TextField
						className='col-span-full lg:col-span-3'
						name='licence'
						label='Numéro de licence'
						type='text'
						placeholder='4512345'
						required
					/>
					{loading && (
						<div className='flex h-96 items-center justify-center'>
							<RefreshIcon className='h-20 w-20 rotate-180 transform animate-spin' />
						</div>
					)}
					{error && (
						<div className='flex h-96 flex-col items-center justify-center text-center text-xl'>
							<span className='mr-1 font-bold'>Erreur :</span>
							{error.message}
						</div>
					)}
					{data?.brackets && (
						<div className='col-span-full grid grid-cols-6 gap-6'>
							<fieldset className='col-span-full lg:col-span-3'>
								<legend className='sr-only'>Tableaux du Samedi</legend>
								<div className='text-base font-medium text-gray-900' aria-hidden='true'>
									Tableaux du Samedi (3 max)
								</div>
								<div className='mt-2 space-y-2'>
									{data.brackets.slice(0, 5).map((bracket: BracketType) => (
										<CheckboxField
											key={bracket.id}
											name={`bracket-${bracket.letter}`}
											label={`Tableau ${bracket.letter}`}
											hint={bracket.name}
										/>
									))}
								</div>
							</fieldset>
							<fieldset className='col-span-full lg:col-span-3'>
								<legend className='sr-only'>Tableaux du Dimanche</legend>
								<div className='text-base font-medium text-gray-900' aria-hidden='true'>
									Tableaux du Dimanche (3 max)
								</div>
								<div className='mt-2 space-y-2'>
									{data.brackets.slice(5).map((bracket: BracketType) => (
										<CheckboxField
											key={bracket.id}
											name={`bracket-${bracket.letter}`}
											label={`Tableau ${bracket.letter} ${
												bracket.remainingEntries < 1 ? '(Complet)' : ''
											}`}
											hint={bracket.name}
											disabled={bracket.remainingEntries < 1}
										/>
									))}
								</div>
							</fieldset>
						</div>
					)}
				</Form.InputList>
				<Form.ButtonList>
					<Button type='submit' text='Envoyer' disabled={methods.formState.isSubmitting} />
				</Form.ButtonList>
			</Form>
		</FormProvider>
	);
};

export default InscriptionForm;
