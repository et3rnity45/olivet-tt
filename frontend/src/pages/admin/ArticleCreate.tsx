import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CreateArticle } from "@Mutations/article";
import CategoryEnum from "@Types/CategoryEnum";
import Select from "@Components/base/Forms/Select";
import Input from "@Components/base/Forms/Input";
import Upload from "@Components/base/Forms/Upload";
import Textarea from "@Components/base/Forms/Textarea";
import UpdateForm from "@Components/base/Forms/UpdateForm";

type ArticleForm = {
  title: string;
  category: CategoryEnum;
  media: File[];
  content: string;
};

const ArticleCreate: FC = () => {
  const history = useHistory();
  const [createArticle] = useMutation(CreateArticle);
  const { register, unregister, setValue, watch, handleSubmit } =
    useForm<ArticleForm>();
  const onSubmit: SubmitHandler<ArticleForm> = async (articleForm) => {
    const { media, ...input } = articleForm;
    await createArticle({ variables: { input, file: media[0] } });
    history.push("/admin/articles");
  };

  return (
    <section className="py-16 mx-4">
      <div className="container mx-auto">
        <h2 className="mb-6 lg:mb-12">Publier un Article</h2>
        <UpdateForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="col-span-full lg:col-span-4"
            name="title"
            label="Titre"
            register={register}
            type="text"
            placeholder="Résultats par équipes - Journée X"
            required
          />
          <Select
            className="col-span-6 lg:col-span-3"
            name="category"
            label="Catégorie"
            register={register}
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
            required
          />
          <Textarea
            className="col-span-full"
            name="content"
            label="Contenu"
            register={register}
            placeholder="Rédigez votre article ici ..."
          />
        </UpdateForm>
      </div>
    </section>
  );
};

export default ArticleCreate;
