import React from "react";
import moment from "moment";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Article from "@Types/Article";

type ListArticleProps = {
  article: Article;
};

const ListArticle = ({ article }: ListArticleProps): JSX.Element => {
  return (
    <article className="flex flex-col shadow-card rounded">
      <Link
        to={`/article/${article.id}`}
        className="relative overflow-hidden bg-darkBlue"
      >
        <img
          className="rounded-t transition-transform transform scale-101 hover:scale-110 duration-400 ease-in-out"
          src={`http://images.olivet-tt.fr/${article.media}`}
          alt={article.title}
        />
      </Link>
      <div className="flex flex-col justify-between bg-white">
        <div className="p-6">
          <p className="label mb-4">{article.category}</p>
          <h3 className="text-2xl font-semibold mb-4">{article.title}</h3>
          <p className="text-gray line-clamp-4 xl:line-clamp-4 2xl:line-clamp-5">
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

export default ListArticle;