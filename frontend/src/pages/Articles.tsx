import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshIcon } from "@heroicons/react/outline";
import { useQuery } from "@apollo/client";
import { ArticlesQuery } from "@Queries/article";
import ArticleCard from "@Components/molecules/ArticleCard";
import CategoryEnum from "@Types/CategoryEnum";
import Article from "@Types/Article";
import FilterControl from "@Components/molecules/FilterControl";

const spring = {
  type: "spring",
  damping: 25,
  stiffness: 250,
};

const Articles = (): JSX.Element => {
  const { loading, error, data } = useQuery(ArticlesQuery);
  const [category, setCategory] = useState<string | undefined>();
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    const articles = data?.articles;
    if (articles) {
      setFilteredArticles(
        category
          ? articles.filter(
              (article: Article) =>
                article.category.toLowerCase() === category.toLowerCase()
            )
          : articles
      );
    }
  }, [data, category]);

  return (
    <section className="py-8 lg:py-16 mx-4" id="contact">
      <div className="container mx-auto">
        <h2 className="mb-8 lg:mb-16">Toute l&apos;acutalité</h2>
        <FilterControl
          filter={category}
          setFilter={setCategory}
          options={Object.values(CategoryEnum)}
          className="pl-5"
        />
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
        {data?.articles && (
          <AnimatePresence exitBeforeEnter>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map((article: Article) => (
                <motion.div
                  key={article.id}
                  layout
                  transition={spring}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ArticleCard article={article} className="lg:p-6" />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default Articles;
