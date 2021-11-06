import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { CreateArticle, UpdateArticle } from "@Mutations/article";
import { ArticleQuery } from "@Queries/article";
import LongTextField from "@Components/atoms/LongTextField";
import SelectField from "@Components/atoms/SelectField";
import UploadField from "@Components/atoms/UploadField";
import TextField from "@Components/atoms/TextField";
import Form from "@Components/molecules/Form";
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
  content: "",
};

const ArticleUpdate = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<{ id: string | undefined }>();
  const form = useForm<ArticleForm>({ defaultValues });
  const [preview, setPreview] = useState(false);

  const { data } = useQuery(ArticleQuery, { variables: { id } });
  const [updateArticle] = useMutation(UpdateArticle);
  const [createArticle] = useMutation(CreateArticle);

  useEffect(() => {
    if (data?.article) {
      form.setValue("title", data.article.title);
      form.setValue("category", data.article.category);
      form.setValue("content", data.article.content);
    }
  }, [data, form]);

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
        {preview ? (
          <>
            <Button
              type="button"
              text="Retour"
              onClick={() => setPreview(false)}
            />
            <div
              className="shadow-xl p-6 prose prose-sm md:prose-lg prose-red max-w-none"
              dangerouslySetInnerHTML={{ __html: form.getValues("content") }}
            />
          </>
        ) : (
          <>
            <h2 className="mb-6 lg:mb-12">
              {id ? "Modifier" : "Publier"} un Article
            </h2>
            {(data?.article || !id) && (
              <Form onSubmit={form.handleSubmit(onSubmit)}>
                <Form.InputList>
                  <TextField
                    className="col-span-full lg:col-span-4"
                    name="title"
                    label="Titre"
                    register={form.register}
                    type="text"
                    placeholder="Résultats par équipes - Journée X"
                    required
                  />
                  <SelectField
                    className="col-span-6 lg:col-span-3"
                    name="category"
                    label="Catégorie"
                    register={form.register}
                    required
                  >
                    <option value={CategoryEnum.competition}>
                      Compétition
                    </option>
                    <option value={CategoryEnum.stage}>Stage</option>
                    <option value={CategoryEnum.autre}>Autre</option>
                  </SelectField>
                  <UploadField
                    className="col-span-full lg:col-span-4"
                    name="media"
                    label="Image"
                    forms={form}
                    required={id === undefined}
                  />
                  <LongTextField
                    className="col-span-full"
                    name="content"
                    label="Contenu"
                    forms={form}
                  />
                </Form.InputList>
                <Form.ButtonList>
                  <Button
                    type="button"
                    text="Prévisualiser"
                    onClick={() => setPreview(true)}
                    outline
                    className="mr-3"
                  />
                  <Button type="submit" text="Publier" />
                </Form.ButtonList>
              </Form>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ArticleUpdate;
