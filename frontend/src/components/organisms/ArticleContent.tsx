import React from "react";
import dayjs from "dayjs";
import { CalendarIcon } from "@heroicons/react/outline";
import Badge from "@Components/atoms/Badge";
import getMediaUrl from "@Utils/mediaUrl";
import Article from "@Types/Article";

type ArticleContentProps = {
  article: Article;
};

const ArticleContent = ({ article }: ArticleContentProps): JSX.Element => {
  return (
    <article>
      <div className="aspect-w-16 aspect-h-9 overflow-hidden mb-8 lg:mb-16">
        <img
          className="object-cover"
          src={getMediaUrl(article.media)}
          alt={article.id}
        />
      </div>
      <div className="mx-0 md:mx-5 lg:mx-20 mb-6">
        <Badge text={article.category} />
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
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
};

export default ArticleContent;
