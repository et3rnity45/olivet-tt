import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { CreateArticle, UpdateArticle } from "@Mutations/article";
import { ArticleQuery } from "@Queries/article";
import LongTextField from "@Components/molecules/LongTextField";
import SelectField from "@Components/molecules/SelectField";
import UploadField from "@Components/molecules/UploadField";
import TextField from "@Components/molecules/TextField";
import Form from "@Components/organisms/Form";
import Button from "@Components/atoms/Button";
import CategoryEnum from "@Types/CategoryEnum";

type ArticleForm = {
  title: string;
  category: CategoryEnum;
  media?: File[];
  content: string;
};

const defaultValues = {
  title: "",
  category: CategoryEnum.competition,
  media: undefined,
  content: undefined,
};

const ArticleUpdate = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<{ id: string | undefined }>();
  const [showForm, setShowForm] = useState(false);
  const methods = useForm<ArticleForm>({ defaultValues });

  const { data } = useQuery(ArticleQuery, { variables: { id } });
  const [updateArticle] = useMutation(UpdateArticle);
  const [createArticle] = useMutation(CreateArticle);

  useEffect(() => {
    if (data?.article) {
      methods.setValue("title", data.article.title);
      methods.setValue("category", data.article.category);
      methods.setValue("content", data.article.content);
      setShowForm(true);
    }
  }, [data, methods]);

  const onSubmit: SubmitHandler<ArticleForm> = async (articleForm) => {
    const { media, ...input } = articleForm;
    if (id) {
      const variables = {
        id,
        input,
        file: media ? media[0] : undefined,
      };
      await updateArticle({ variables });
      history.push("/admin/articles", "Article mis à jour");
    } else if (media) {
      await createArticle({ variables: { input, file: media[0] } });
      history.push("/admin/articles", "Article publié");
    }
  };

  return (
    <section className="py-16 mx-4">
      <div className="container mx-auto">
        <h2 className="mb-6 lg:mb-12">
          {id ? "Modifier" : "Ajouter"} un Article
        </h2>
        {(showForm || !id) && (
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
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
                  required={id === undefined}
                />
                <LongTextField
                  className="col-span-full"
                  name="content"
                  label="Contenu"
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

export default ArticleUpdate;
