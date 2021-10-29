import React from "react";
import dayjs from "dayjs";
import { CalendarIcon } from "@heroicons/react/outline";
import Article from "@Types/Article";
import getMediaUrl from "@Utils/mediaUrl";

type PageArticleProps = {
  article: Article;
};

const PageArticle = ({ article }: PageArticleProps): JSX.Element => {
  return (
    <article>
      <img
        className="w-full h-auto mb-8 lg:mb-16"
        src={getMediaUrl(article.media)}
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
            {dayjs(article.createdAt).format("D MMMM, YYYY")}
          </span>
        </div>
      </div>
      <div
        className="prose prose-sm md:prose-lg prose-red max-w-none mx-0 md:mx-5 lg:mx-20 mt-8"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
};

export default PageArticle;
