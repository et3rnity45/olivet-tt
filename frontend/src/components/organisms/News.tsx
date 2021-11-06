import React from "react";
import { ArrowRightIcon, RefreshIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Article from "@Types/Article";
import ArticleCard from "@Components/molecules/ArticleCard";
import { NewestArticles } from "@Queries/article";

const News = (): JSX.Element => {
  const { loading, error, data } = useQuery(NewestArticles);

  return (
    <section className="py-16" id="discover">
      <div className="container px-4 mx-auto">
        <h2>Actualité du Club</h2>
        <hr className="my-10 text-lightWhite" />
        {loading && (
          <div className="flex justify-center items-center h-96">
            <RefreshIcon className="h-20 w-20 animate-spin transform rotate-180" />
          </div>
        )}
        {error && (
          <div className="flex flex-col justify-center items-center text-center h-96 text-xl">
            <span className="font-bold mr-1">Erreur :</span>
            {error.message}
          </div>
        )}
        {data?.newestArticles && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-2">
            {data.newestArticles.map((article: Article) => (
              <ArticleCard
                key={article.id}
                article={article}
                className="lg:p-6"
              />
            ))}
          </div>
        )}
        <div className="mt-8">
          <Link to="/articles" className="relative article-link float-right">
            Voir toute l&apos;actualité
            <ArrowRightIcon
              className="inline-block align-middle ml-2"
              height="16"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
