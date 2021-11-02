import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";
import {
  PencilIcon,
  PlusIcon,
  RefreshIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import ArticleType from "@Types/Article";
import { ArticlesQuery } from "@Queries/article";
import { DeleteArticle } from "@Mutations/article";
import { NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const columns = ["#", "Titre", "Catégorie", "Mise à jour", "Date de création"];

const ArticleTable = (): JSX.Element => {
  const location = useLocation();
  const { loading, error, data } = useQuery(ArticlesQuery, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  const [deleteArticle] = useMutation(DeleteArticle, {
    refetchQueries: [ArticlesQuery],
  });

  const handleDelete = async (id: string) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
      await deleteArticle({ variables: { id } });
      toast.success("Article supprimé avec succès", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (location.state) {
      toast.success(`${location.state}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, [location.state]);

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
          <>
            <NavLink
              to={`${location.pathname}/create`}
              className="inline-flex items-center mb-4 px-5 py-2 rounded bg-lightBlue text-white transform hover:-translate-y-1 transition duration-400 ease-in-out"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              <span>Publier un nouvel article</span>
            </NavLink>
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {columns.map((heading) => (
                            <th
                              key={heading}
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {heading}
                            </th>
                          ))}
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Modifier</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="relative bg-white divide-y divide-gray-200">
                        {data?.articles
                          .slice(0)
                          .reverse()
                          .map((article: ArticleType, idx: number) => (
                            <tr key={article.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {idx + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {article.title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  {article.category}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {dayjs(article.updatedAt).fromNow()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {dayjs(article.createdAt).format("D MMM YYYY")}
                              </td>
                              <td className="flex justify-evenly px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <NavLink
                                  to={`${location.pathname}/edit/${article.id}`}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  <PencilIcon className="relative h-5 w-5" />
                                </NavLink>
                                <button
                                  type="button"
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => handleDelete(article.id)}
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ArticleTable;
