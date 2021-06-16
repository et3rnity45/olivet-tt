import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ArticleQuery } from "../graphql/queries/article";
import PageArticle from "../components/base/PageArticle/PageArticle";

const Article = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(ArticleQuery, {
    variables: { id },
  });

  return (
    <section className="py-8 lg:py-16 mx-4" id="contact">
      <div className="article-container mx-auto">
        {loading ? <p>Chargement ...</p> : null}
        {error ? <p>Error</p> : null}
        {data?.article ? <PageArticle article={data?.article} /> : null}
      </div>
    </section>
  );
};

export default Article;
