import React, { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import { RefreshIcon } from "@heroicons/react/outline";
import { UpdateArticle } from "@Mutations/article";
import { ArticleQuery } from "@Queries/article";
import CategoryEnum from "@Types/CategoryEnum";
import UpdateForm from "@Components/base/Forms/UpdateForm";
import Textarea from "@Components/base/Forms/Textarea";
import Select from "@Components/base/Forms/Select";
import Upload from "@Components/base/Forms/Upload";
import Input from "@Components/base/Forms/Input";

type ArticleForm = {
  title: string;
  category: CategoryEnum;
  media?: File[];
  content: string;
};

const ArticleUpdate: FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { register, unregister, setValue, watch, handleSubmit } =
    useForm<ArticleForm>();
  const [updateArticle] = useMutation(UpdateArticle);
  const { loading, error, data } = useQuery(ArticleQuery, {
    variables: { id },
  });

  const onSubmit: SubmitHandler<ArticleForm> = async (articleForm) => {
    const { media, ...input } = articleForm;
    const variables = {
      id,
      input,
      file: media ? media[0] : undefined,
    };
    await updateArticle({ variables });
    history.push("/admin/articles");
  };

  return (
    <section className="py-16 mx-4">
      <div className="container mx-auto">
        <h2 className="mb-6 lg:mb-12">Modifier un Article</h2>
        {loading && (
          <div className="flex justify-center items-center h-96">
            <RefreshIcon className="h-20 w-20 animate-spin transform rotate-180" />
          </div>
        )}
        {error && (
          <div className="w-full flex flex-col justify-center items-center text-center h-96 text-xl">
            <span className="font-bold mr-1">Erreur :</span>
            {error.message}
          </div>
        )}
        {data?.article && (
          <UpdateForm onSubmit={handleSubmit(onSubmit)}>
            <Input
              className="col-span-full lg:col-span-4"
              name="title"
              label="Titre"
              register={register}
              type="text"
              defaultValue={data.article.title}
              placeholder="Résultats par équipes - Journée X"
              required
            />
            <Select
              className="col-span-6 lg:col-span-3"
              name="category"
              label="Catégorie"
              register={register}
              defaultValue={data.article.category}
              required
            >
              <option value={CategoryEnum.competition}>Compétition</option>
              <option value={CategoryEnum.stage}>Stage</option>
              <option value={CategoryEnum.autre}>Autre</option>
            </Select>
            <Upload
              className="col-span-full lg:col-span-4"
              name="media"
              label="Image"
              register={register}
              unregister={unregister}
              setValue={setValue}
              watch={watch}
            />
            <Textarea
              className="col-span-full"
              name="content"
              label="Contenu"
              register={register}
              placeholder="Rédigez votre article ici ..."
              defaultValue={data.article.content}
            />
          </UpdateForm>
        )}
      </div>
    </section>
  );
};

export default ArticleUpdate;
