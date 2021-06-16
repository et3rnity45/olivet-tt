import React from "react";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/fr";
import Article from "../../types/Article";

type HomeArticleProps = {
  article: Article;
  reversed?: boolean;
};

const HomeArticle = ({
  article,
  reversed = false,
}: HomeArticleProps): JSX.Element => {
  return (
    <article className="flex-1 flex flex-col lg:flex-row shadow-card mb-10">
      <Link
        to={`/article/${article.id}`}
        className={`flex-1 relative overflow-hidden bg-darkBlue ${
          reversed ? "order-none lg:order-last" : ""
        }`}
      >
        <img
          className="transition-transform transform scale-101 hover:scale-110 duration-400 ease-in-out"
          src={`http://images.olivet-tt.fr/${article.media}`}
          alt={article.title}
        />
      </Link>
      <div className="flex-1 flex flex-col justify-between bg-white">
        <div className="p-6">
          <p className="label mb-4">{article.category}</p>
          <h3 className="text-2xl font-semibold mb-4">{article.title}</h3>
          <p className="text-gray line-clamp-5 lg:line-clamp-2 xl:line-clamp-4 2xl:line-clamp-5">
            {article.content}
          </p>
        </div>
        <div className="py-6 px-6 sm:px-10 border-t border-1 border-lightGray">
          <span className="text-gray font-light">
            {moment(article.createdAt).fromNow()}
          </span>
          <Link
            className="relative article-link float-right font-light"
            to={`/article/${article.id}`}
          >
            Lire la suite
            <ArrowRightIcon
              className="inline-block align-middle ml-2"
              height="16"
            />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default HomeArticle;
