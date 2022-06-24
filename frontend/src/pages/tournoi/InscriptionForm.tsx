import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Form from '@/components/organisms/Form';
import TextField from '@/components/molecules/TextField';
import Button from '@/components/atoms/Button';
import { InscriptionInput } from '@/pages/tournoi/OnSiteInscription';
import CheckboxField from '@/components/molecules/CheckboxField';

type InscriptionFormProps = {
	onSubmit: (data: InscriptionInput) => Promise<void>;
};

const InscriptionForm = ({ onSubmit }: InscriptionFormProps): JSX.Element => {
	const methods = useForm<InscriptionInput>();

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
					<div className='col-span-full grid grid-cols-6 gap-6'>
						<fieldset className='col-span-full lg:col-span-3'>
							<legend className='sr-only'>Tableaux du Samedi</legend>
							<div className='text-base font-medium text-gray-900' aria-hidden='true'>
								Tableaux du Samedi (3 max)
							</div>
							<div className='mt-2 space-y-2'>
								<CheckboxField name='bracket-a' label='Tableau A' hint='500 - 1599' />
								<CheckboxField name='bracket-b' label='Tableau B' hint='500 - 1899' />
								<CheckboxField name='bracket-c' label='Tableau C' hint='500 - 2200' />
								<CheckboxField name='bracket-d' label='Tableau D' hint='Open' />
								<CheckboxField name='bracket-e' label='Tableau E' hint='Dames' />
							</div>
						</fieldset>
						<fieldset className='col-span-full lg:col-span-3'>
							<legend className='sr-only'>Tableaux du Dimanche</legend>
							<div className='text-base font-medium text-gray-900' aria-hidden='true'>
								Tableaux du Dimanche (3 max)
							</div>
							<div className='mt-2 space-y-2'>
								<CheckboxField name='bracket-f' label='Tableau F' hint='500 - 699' />
								<CheckboxField name='bracket-g' label='Tableau G' hint='500 - 899' />
								<CheckboxField name='bracket-h' label='Tableau H' hint='500 - 1099' />
								<CheckboxField name='bracket-i' label='Tableau I' hint='500 - 1299' />
								<CheckboxField name='bracket-j' label='Tableau J' hint='500 - 1499' />
								<CheckboxField name='bracket-k' label='Tableau K' hint='500 - 1699' />
								<CheckboxField name='bracket-l' label='Tableau L' hint='Jeunes' />
							</div>
						</fieldset>
					</div>
				</Form.InputList>
				<Form.ButtonList>
					<Button type='submit' text='Envoyer' disabled={methods.formState.isSubmitting} />
				</Form.ButtonList>
			</Form>
		</FormProvider>
	);
};

export default InscriptionForm;
