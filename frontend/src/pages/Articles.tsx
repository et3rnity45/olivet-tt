import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { RefreshIcon } from "@heroicons/react/outline";
import Article from "@Types/Article";
import { ArticlesQuery } from "@Queries/article";
import ListArticle from "@Components/base/ListArticle";

const options = ["competition", "stage", "autre"];

const Articles = (): JSX.Element => {
  const { category } = useParams<{ category: string | undefined }>();
  const [filter, setFilter] = useState(category?.toLowerCase());
  const [filteredArticles, setFilteredArticles] = useState([]);
  const { loading, error, data } = useQuery(ArticlesQuery);

  useEffect(() => {
    setFilter(category?.toLowerCase());
  }, [category]);

  useEffect(() => {
    if (filter) {
      setFilteredArticles(
        data?.articles.filter((article: Article) => article.category === filter)
      );
    } else {
      setFilteredArticles(data?.articles);
    }
  }, [data?.articles, filter]);

  const articleList = filteredArticles?.map((article: Article) => {
    return (
      <li key={article.id}>
        <ListArticle article={article} />
      </li>
    );
  });

  return (
    <section className="py-8 lg:py-16 mx-4" id="contact">
      <div className="container mx-auto">
        <h2 className="mb-8 lg:mb-16">Toute l&apos;acutalité</h2>
        <div>
          <div className="flex mb-8">
            <div className="pr-3 border-r border-lightGray">
              <button
                type="button"
                onClick={() => setFilter("")}
                className="filter-button"
              >
                Tous
              </button>
            </div>
            <ul className="flex">
              {options.map((option: string) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => setFilter(option)}
                    className="filter-button md:ml-2"
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
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
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.articles ? <>{articleList}</> : null}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Articles;
