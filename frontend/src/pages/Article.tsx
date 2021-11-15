import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ArticleQuery } from "@Queries/article";
import ArticleContent from "@Components/organisms/ArticleContent";
import NotFound from "@Pages/NotFound";

const Article = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(ArticleQuery, {
    variables: { id },
  });

  return (
    <section className="py-8 lg:py-16 mx-4" id="article">
      <div className="article-container mx-auto">
        {loading && <p>Chargement ...</p>}
        {error && <NotFound />}
        {data?.article && <ArticleContent article={data?.article} />}
      </div>
    </section>
  );
};

export default Article;
