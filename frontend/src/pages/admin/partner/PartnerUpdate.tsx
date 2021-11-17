import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { PartnerQuery } from "@Queries/partner";
import { CreatePartner, UpdatePartner } from "@Mutations/partner";
import PartnerForm from "@Pages/admin/partner/PartnerForm";

export type PartnerInput = {
  name: string;
  url: string;
  media?: File[];
};

const PartnerUpdate = (): JSX.Element => {
  const history = useHistory();
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
      history.replace("/admin/partners", "Partenaire mis à jour");
    } else if (media) {
      await createPartner({ variables: { input, file: media[0] } });
      history.replace("/admin/partners", "Partenaire ajouté");
    }
  };

  if (loading) return <div>Loading ...</div>;

  const defaultValues: PartnerInput = {
    name: data?.partner?.name ?? "",
    url: data?.partner?.url ?? "",
    media: undefined,
  };

  return (
    <PartnerForm
      formId={id}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
};

export default PartnerUpdate;
