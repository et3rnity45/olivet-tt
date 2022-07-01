import React from 'react';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
	onSubmit: (data: InscriptionInput) => Promise<boolean>;
};

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
	firstname: yup.string().required('Ce champ est obligatoire'),
	lastname: yup.string().required('Ce champ est obligatoire'),
	licence: yup.string().required('Ce champ est obligatoire'),
	email: yup.string().email("L'email doit être valide").required('Ce champ est obligatoire'),
	phone: yup
		.string()
		.matches(phoneRegExp, 'Le numéro doit être valide')
		.required('Ce champ est obligatoire'),
});

const InscriptionForm = ({ onSubmit }: InscriptionFormProps): JSX.Element => {
	const { data, loading, error } = useQuery(BracketsQuery);
	const methods = useForm<InscriptionInput>({ mode: 'onTouched', resolver: yupResolver(schema) });

	const handleSubmit = async (data: InscriptionInput) => {
		await onSubmit(data)
			.then((success) => {
				console.log(success);
				if (success) methods.reset();
			})
			.catch((err) => console.error(err));
	};
	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(handleSubmit)}>
				<Form.InputList>
					<TextField id='firstname' label='Prénom' className='col-span-full lg:col-span-3' />
					<TextField id='lastname' label='Nom' className='col-span-full lg:col-span-3' />
					<TextField id='email' label='E-mail' className='col-span-full lg:col-span-3' />
					<TextField
						id='phone'
						label='Numéro de téléphone'
						className='col-span-full lg:col-span-3'
					/>
					<TextField
						id='licence'
						label='Numéro de licence'
						className='col-span-full lg:col-span-3'
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
											id={`brackets.bracket${bracket.letter}`}
											label={`Tableau ${bracket.letter}`}
											helperText={bracket.name}
											disabled={bracket.remainingEntries < 1}
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
											id={`brackets.bracket${bracket.letter}`}
											label={`Tableau ${bracket.letter} ${
												bracket.remainingEntries < 1 ? '(Complet)' : ''
											}`}
											helperText={bracket.name}
											disabled={bracket.remainingEntries < 1}
										/>
									))}
								</div>
							</fieldset>
						</div>
					)}
				</Form.InputList>
				<Form.ButtonList>
					<Button type='submit' disabled={methods.formState.isSubmitting}>
						Envoyer
					</Button>
				</Form.ButtonList>
			</form>
		</FormProvider>
	);
};

export default InscriptionForm;
