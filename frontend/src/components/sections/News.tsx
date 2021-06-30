import React from "react";
import { ArrowRightIcon, RefreshIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Article from "@Types/Article";
import HomeArticle from "@Components/base/HomeArticle";
import { NewestArticles } from "@Queries/article";

const News = (): JSX.Element => {
  const { loading, error, data } = useQuery(NewestArticles);

  const newestArticles = data?.newestArticles?.map(
    (article: Article, index: number) => {
      return (
        <HomeArticle
          key={article.id}
          article={article}
          reversed={index % 2 !== 0}
        />
      );
    }
  );

  return (
    <section className="py-16 bg-lightGray" id="discover">
      <div className="container px-4 mx-auto">
        <h2>Actualité du Club</h2>
        <hr className="my-10 text-lightWhite" />
        <div className="flex flex-col mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <RefreshIcon className="h-20 w-20 animate-spin transform rotate-180" />
            </div>
          ) : null}
          {error ? (
            <div className="flex flex-col justify-center items-center text-center h-96 text-xl">
              <span className="font-bold mr-1">Erreur :</span>
              {error.message}
            </div>
          ) : null}
          {data?.newestArticles ? <>{newestArticles}</> : null}
          <div>
            <Link to="/articles" className="relative article-link float-right">
              Voir toute l&apos;actualité
              <ArrowRightIcon
                className="inline-block align-middle ml-2"
                height="16"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
