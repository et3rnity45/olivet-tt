import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { PartnerQuery } from '@/graphql/queries/partner';
import { CreatePartner, UpdatePartner } from '@/graphql/mutations/partner';
import PartnerForm from '@/pages/admin/partner/PartnerForm';

export type PartnerInput = {
	name: string;
	url: string;
	media?: File[];
};

const PartnerUpdate = (): JSX.Element => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string | undefined }>();
	const { data, loading } = useQuery(PartnerQuery, { variables: { id } });
	const [updatePartner] = useMutation(UpdatePartner);
	const [createPartner] = useMutation(CreatePartner);

	const handleSubmit = async (partnerInput: PartnerInput) => {
		const { media, ...input } = partnerInput;
		if (id) {
			const variables = {
				id,
				input,
				file: media ? media[0] : undefined,
			};
			await updatePartner({ variables });
			navigate('/admin/partners', { state: 'Partenaire mis à jour', replace: true });
		} else if (media) {
			await createPartner({ variables: { input, file: media[0] } });
			navigate('/admin/partners', { state: 'Partenaire ajouté', replace: true });
		}
	};

	if (loading) return <div>Loading ...</div>;

	const defaultValues: PartnerInput = {
		name: data?.partner?.name ?? '',
		url: data?.partner?.url ?? '',
		media: undefined,
	};

	return <PartnerForm formId={id} defaultValues={defaultValues} onSubmit={handleSubmit} />;
};

export default PartnerUpdate;
