import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ArticleQuery } from "@Queries/article";
import PageArticle from "@Components/base/PageArticle/PageArticle";

const Article = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(ArticleQuery, {
    variables: { id },
  });

  return (
    <section className="py-8 lg:py-16 mx-4" id="article">
      <div className="article-container mx-auto">
        {loading ? <p>Chargement ...</p> : null}
        {error ? <p>Error: This article doesn&apos;t exist</p> : null}
        {data?.article ? <PageArticle article={data?.article} /> : null}
      </div>
    </section>
  );
};

export default Article;
