import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Form from '@/components/organisms/Form';
import TextField from '@/components/molecules/TextField';
import UploadField from '@/components/molecules/UploadField';
import Button from '@/components/atoms/Button';
import { PartnerInput } from '@/pages/admin/partner/PartnerUpdate';

interface PartnerFormProps {
	formId: string | undefined;
	defaultValues: PartnerInput;
	onSubmit: (data: PartnerInput) => Promise<void>;
}

const PartnerForm = ({ formId, defaultValues, onSubmit }: PartnerFormProps): JSX.Element => {
	const methods = useForm<PartnerInput>({ defaultValues });

	const handleSubmit = async (data: PartnerInput) => {
		await onSubmit(data)
			.then(() => methods.reset(data))
			.catch((err) => console.error(err));
	};

	return (
		<section className='mx-4 py-16'>
			<div className='container mx-auto'>
				<h2 className='mb-6 lg:mb-12'>{formId ? 'Modifier' : 'Ajouter'} un Partenaire</h2>
				<FormProvider {...methods}>
					<Form onSubmit={methods.handleSubmit(handleSubmit)}>
						<Form.InputList>
							<TextField
								id='name'
								label='Nom'
								className='col-span-full lg:col-span-4'
								placeholder="Ville d'olivet"
							/>
							<TextField
								id='url'
								label='Lien'
								className='col-span-full lg:col-span-4'
								placeholder='http://www.olivet.fr/'
							/>
							<UploadField
								className='col-span-full lg:col-span-4'
								name='media'
								label='Logo'
								required={formId === undefined}
							/>
						</Form.InputList>
						<Form.ButtonList>
							<Button type='submit' disabled={methods.formState.isSubmitting}>
								{formId ? 'Modifier' : 'Ajouter'}
							</Button>
						</Form.ButtonList>
					</Form>
				</FormProvider>
			</div>
		</section>
	);
};

export default PartnerForm;
