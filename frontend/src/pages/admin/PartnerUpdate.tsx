import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { PartnerQuery } from "@Queries/partner";
import { CreatePartner, UpdatePartner } from "@Mutations/partner";
import UploadField from "@Components/molecules/UploadField";
import TextField from "@Components/molecules/TextField";
import Form from "@Components/organisms/Form";
import Button from "@Components/atoms/Button";

type PartnerForm = {
  name: string;
  url: string;
  media?: File[];
};

const defaultValues = {
  name: "",
  url: "",
  media: undefined,
};

const PartnerUpdate = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<{ id: string | undefined }>();
  const [showForm, setShowForm] = useState(false);
  const methods = useForm<PartnerForm>({ defaultValues });

  const { data } = useQuery(PartnerQuery, { variables: { id } });
  const [updatePartner] = useMutation(UpdatePartner);
  const [createPartner] = useMutation(CreatePartner);

  useEffect(() => {
    if (data?.partner) {
      methods.setValue("name", data.partner.name);
      methods.setValue("url", data.partner.url);
      setShowForm(true);
    }
  }, [data, methods]);

  const onSubmit: SubmitHandler<PartnerForm> = async (partnerForm) => {
    const { media, ...input } = partnerForm;
    if (id) {
      const variables = {
        id,
        input,
        file: media ? media[0] : undefined,
      };
      await updatePartner({ variables });
      history.push("/admin/partners", "Partenaire mis à jour");
    } else if (media) {
      await createPartner({ variables: { input, file: media[0] } });
      history.push("/admin/partners", "Partenaire ajouté");
    }
  };

  return (
    <section className="py-16 mx-4">
      <div className="container mx-auto">
        <h2 className="mb-6 lg:mb-12">
          {id ? "Modifier" : "Ajouter"} un Partenaire
        </h2>
        {(showForm || !id) && (
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <Form.InputList>
                <TextField
                  className="col-span-full lg:col-span-4"
                  name="name"
                  label="Nom"
                  type="text"
                  placeholder="Ville d'olivet"
                  required
                />
                <TextField
                  className="col-span-full lg:col-span-4"
                  name="url"
                  label="Lien"
                  type="text"
                  placeholder="http://www.olivet.fr/"
                  required
                />
                <UploadField
                  className="col-span-full lg:col-span-4"
                  name="media"
                  label="Logo"
                  required={id === undefined}
                />
              </Form.InputList>
              <Form.ButtonList>
                <Button type="submit" text={id ? "Modifier" : "Ajouter"} />
              </Form.ButtonList>
            </Form>
          </FormProvider>
        )}
      </div>
    </section>
  );
};

export default PartnerUpdate;
