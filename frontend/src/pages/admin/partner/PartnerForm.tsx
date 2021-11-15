import { FormProvider, useForm } from "react-hook-form";
import Form from "@Components/organisms/Form";
import TextField from "@Components/molecules/TextField";
import UploadField from "@Components/molecules/UploadField";
import Button from "@Components/atoms/Button";
import { PartnerInput } from "@Pages/admin/partner/PartnerUpdate";

interface PartnerFormProps {
  formId: string | undefined;
  defaultValues: PartnerInput;
  onSubmit: (data: PartnerInput) => Promise<void>;
}

const PartnerForm = ({
  formId,
  defaultValues,
  onSubmit,
}: PartnerFormProps): JSX.Element => {
  const methods = useForm<PartnerInput>({ defaultValues });

  const handleSubmit = async (data: PartnerInput) => {
    await onSubmit(data)
      .then(() => methods.reset(data))
      .catch((err) => console.error(err));
  };

  return (
    <section className="py-16 mx-4">
      <div className="container mx-auto">
        <h2 className="mb-6 lg:mb-12">
          {formId ? "Modifier" : "Ajouter"} un Partenaire
        </h2>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(handleSubmit)}>
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
                required={formId === undefined}
              />
            </Form.InputList>
            <Form.ButtonList>
              <Button
                type="submit"
                text={formId ? "Modifier" : "Ajouter"}
                disabled={methods.formState.isSubmitting}
              />
            </Form.ButtonList>
          </Form>
        </FormProvider>
      </div>
    </section>
  );
};

export default PartnerForm;
