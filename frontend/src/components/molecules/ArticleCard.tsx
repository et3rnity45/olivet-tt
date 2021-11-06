import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Article from "@Types/Article";
import getMediaUrl from "@Utils/mediaUrl";
import Badge from "@Components/atoms/Badge";

type ArticleCardProps = {
  article: Article;
  className?: string;
};

const ArticleCard = ({
  article,
  className = "",
}: ArticleCardProps): JSX.Element => {
  return (
    <article className={`h-full ${className}`}>
      <Link
        to={`/article/${article.id}`}
        className="h-full flex flex-col transition duration-200 ease-in-out group hover:-translate-y-1 hover:shadow-2xl"
      >
        <div className="aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden">
          <img
            src={getMediaUrl(article.media)}
            alt={article.title}
            className="object-cover rounded-t-lg transition duration-400 ease-in-out group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col items-center py-6">
          <Badge text={article.category} />
          <h3 className="text-2xl text-center font-semibold break-words line-clamp-2 mb-2">
            {article.title}
          </h3>
          <span className="text-gray-500 font-medium py-2 mb-2">
            {dayjs(article.createdAt).fromNow()}
          </span>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
