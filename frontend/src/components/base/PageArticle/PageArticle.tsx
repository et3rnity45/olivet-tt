import { CalendarIcon } from "@heroicons/react/outline";
import moment from "moment";
import React from "react";
import Article from "../../../types/Article";
import "./pageArticle.css";

type PageArticleProps = {
  article: Article;
};

const PageArticle = ({ article }: PageArticleProps): JSX.Element => {
  return (
    <article>
      <img
        className="w-full h-auto mb-8 lg:mb-16"
        src={`http://images.olivet-tt.fr/${article.media}`}
        alt={article.id}
      />
      <div className="mx-0 md:mx-5 lg:mx-20 mb-6">
        <p className="label mb-4">{article.category}</p>
        <h1 className="font-bold text-black text-3xl lg:text-5xl tracking-widest mb-6">
          {article.title}
        </h1>
        <div className="flex items-center">
          <CalendarIcon className="h-5 mr-2" />
          <span className="uppercase">
            {moment(article.createdAt).format("D MMM, YYYY")}
          </span>
        </div>
      </div>
      <div className="article-content mx-0 md:mx-5 lg:mx-20">
        <p>{article.content}</p>
      </div>
    </article>
  );
};

export default PageArticle;
