import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { CreateArticle, UpdateArticle } from '@/graphql/mutations/article';
import { ArticleQuery } from '@/graphql/queries/article';
import CategoryEnum from '@/types/CategoryEnum';
import ArticleForm from '@/pages/admin/article/ArticleForm';

export type ArticleInput = {
	title: string;
	category: CategoryEnum;
	media?: File[];
	content: string;
};

const ArticleUpdate = (): JSX.Element => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string | undefined }>();
	const { data, loading } = useQuery(ArticleQuery, { variables: { id } });
	const [updateArticle] = useMutation(UpdateArticle);
	const [createArticle] = useMutation(CreateArticle);

	const handleSubmit = async (articleInput: ArticleInput) => {
		const { media, ...input } = articleInput;
		if (id) {
			const variables = {
				id,
				input,
				file: media ? media[0] : undefined,
			};
			await updateArticle({ variables });
			navigate('/admin/articles', { state: 'Article mis à jour', replace: true });
		} else if (media) {
			await createArticle({ variables: { input, file: media[0] } });
			navigate('/admin/articles', { state: 'Article publié', replace: true });
		}
	};

	if (loading) return <div>Loading ...</div>;

	const defaultValues: ArticleInput = {
		title: data?.article?.title ?? '',
		category: data?.article?.category ?? CategoryEnum.competition,
		media: undefined,
		content: data?.article?.content ?? '',
	};

	return <ArticleForm formId={id} defaultValues={defaultValues} onSubmit={handleSubmit} />;
};

export default ArticleUpdate;
