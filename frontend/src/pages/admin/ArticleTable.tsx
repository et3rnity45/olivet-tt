import React from "react";
import { useQuery } from "@apollo/client";
import { PencilIcon, RefreshIcon, TrashIcon } from "@heroicons/react/outline";
import ArticleType from "@Types/Article";
import { ArticlesQuery } from "@Queries/article";
import { NavLink, useLocation } from "react-router-dom";

const ArticleTable = (): JSX.Element => {
  const { loading, error, data } = useQuery(ArticlesQuery);
  const location = useLocation();

  const articleTable = data?.articles?.map(
    (article: ArticleType, idx: number) => (
      <tr key={article.id}>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {idx + 1}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {article.title}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {article.category}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {article.updatedAt}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {article.createdAt}
        </td>
        <td className="flex justify-evenly px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <NavLink
            to={`${location.pathname}/edit`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <PencilIcon className="relative h-5 w-5" />
          </NavLink>
          <button type="button" className="text-red-600 hover:text-red-900">
            <TrashIcon className="h-5 w-5" />
          </button>
        </td>
      </tr>
    )
  );

  return (
    <section className="py-16 mx-4">
      <div className="container mx-auto">
        <h2 className="mb-6 lg:mb-12">Liste des Articles</h2>
        {loading && (
          <div className="flex justify-center items-center h-96">
            <RefreshIcon className="h-20 w-20 animate-spin transform rotate-180" />
          </div>
        )}
        {error && (
          <div className="w-full flex flex-col justify-center items-center text-center h-96 text-xl">
            <span className="font-bold mr-1">Erreur :</span>
            {error.message}
          </div>
        )}
        {data?.articles && (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Titre
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Catégorie
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Mise à jour
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date de création
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Modifier</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="relative bg-white divide-y divide-gray-200">
                      {articleTable}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleTable;
