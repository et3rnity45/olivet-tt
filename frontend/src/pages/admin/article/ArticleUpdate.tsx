import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CreateArticle, UpdateArticle } from "@Mutations/article";
import { ArticleQuery } from "@Queries/article";
import CategoryEnum from "@Types/CategoryEnum";
import ArticleForm from "@Pages/admin/article/ArticleForm";

export type ArticleInput = {
  title: string;
  category: CategoryEnum;
  media?: File[];
  content: string;
};

const ArticleUpdate = (): JSX.Element => {
  const history = useHistory();
  const { id } = useParams<{ id: string | undefined }>();
  const { data, loading } = useQuery(ArticleQuery, { variables: { id } });
  const [updateArticle] = useMutation(UpdateArticle);
  const [createArticle] = useMutation(CreateArticle);

  const handleSubmit = async (articleInput: ArticleInput) => {
    const { media, ...input } = articleInput;
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

  if (loading) return <div>Loading ...</div>;

  const defaultValues: ArticleInput = {
    title: data?.article?.title ?? "",
    category: data?.article?.category ?? CategoryEnum.competition,
    media: undefined,
    content: data?.article?.content ?? "",
  };

  return (
    <ArticleForm
      formId={id}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
};

export default ArticleUpdate;
