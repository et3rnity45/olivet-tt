import { FormProvider, useForm } from "react-hook-form";
import Form from "@Components/organisms/Form";
import TextField from "@Components/molecules/TextField";
import UploadField from "@Components/molecules/UploadField";
import SelectField from "@Components/molecules/SelectField";
import LongTextField from "@Components/molecules/LongTextField";
import Button from "@Components/atoms/Button";
import { ArticleInput } from "@Pages/admin/article/ArticleUpdate";
import CategoryEnum from "@Types/CategoryEnum";

type ArticleFormProps = {
  formId: string | undefined;
  defaultValues: ArticleInput;
  onSubmit: (data: ArticleInput) => Promise<void>;
};

const ArticleForm = ({
  formId,
  defaultValues,
  onSubmit,
}: ArticleFormProps): JSX.Element => {
  const methods = useForm<ArticleInput>({ defaultValues });

  const handleSubmit = async (data: ArticleInput) => {
    await onSubmit(data)
      .then(() => methods.reset(data))
      .catch((err) => console.error(err));
  };
  return (
    <section className="py-16 mx-4">
      <div className="container mx-auto">
        <h2 className="mb-6 lg:mb-12">
          {formId ? "Modifier" : "Ajouter"} un Article
        </h2>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(handleSubmit)}>
            <Form.InputList>
              <TextField
                className="col-span-full lg:col-span-4"
                name="title"
                label="Titre"
                type="text"
                placeholder="Résultats par équipes - Journée X"
                required
              />
              <SelectField
                className="col-span-6 lg:col-span-3"
                name="category"
                label="Catégorie"
                required
              >
                <option value={CategoryEnum.competition}>Compétition</option>
                <option value={CategoryEnum.stage}>Stage</option>
                <option value={CategoryEnum.autre}>Autre</option>
              </SelectField>
              <UploadField
                className="col-span-full lg:col-span-4"
                name="media"
                label="Image"
                required={formId === undefined}
              />
              <LongTextField
                className="col-span-full"
                name="content"
                label="Contenu"
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

export default ArticleForm;
