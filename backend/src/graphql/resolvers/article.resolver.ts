import {
  Resolver, Query, Arg, ID, Mutation, Authorized,
} from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ApolloError } from 'apollo-server-express';
import ArticleInput from '../inputs/article.input';
import { Article, ArticleModel } from '../../entities/article.entity';
import { uploadFile, deleteFile } from '../../utils/UploadFile';

@Resolver(Article)
export default class ArticleResolver {
  @Query(() => [Article])
  async articles(): Promise<Article[]> {
    const articles = await ArticleModel.find().sort('-createdAt').exec();

    return articles;
  }

  @Query(() => Article)
  async article(@Arg('id', () => ID) id: string): Promise<Article> {
    const article = await ArticleModel.findById(id).exec();

    if (!article) throw new Error('article not found');

    return article;
  }

  @Query(() => [Article])
  async newestArticles(): Promise<Article[]> {
    const articles = await ArticleModel.find().sort('-createdAt').limit(2).exec();

    return articles;
  }

  @Authorized()
  @Mutation(() => Article)
  async createArticle(
    @Arg('input') input: ArticleInput,
      @Arg('file', () => GraphQLUpload) file: FileUpload,
  ): Promise<Article> {
    const media = await uploadFile(file);
    const article = new ArticleModel({ ...input, media });

    try {
      await article.save();
    } catch (err: any) {
      if (err.name === 'MongoError' && err.code === 11000) {
        deleteFile(article.media);
        throw new ApolloError('duplicate value');
      }
    }

    return article;
  }

  @Authorized()
  @Mutation(() => Article)
  async updateArticle(
    @Arg('id', () => ID) id: string,
      @Arg('input') input: ArticleInput,
      @Arg('file', () => GraphQLUpload, { nullable: true }) file?: FileUpload,
  ): Promise<Article> {
    const currentArticle = await ArticleModel.findById(id).exec();
    if (!currentArticle) throw new ApolloError('article not found');

    let { media } = currentArticle;
    if (file) {
      deleteFile(currentArticle.media);
      media = await uploadFile(file);
    }
    const article = await ArticleModel.findByIdAndUpdate(id, { ...input, media }, { new: true });

    return article;
  }

  @Authorized()
  @Mutation(() => Article)
  async deleteArticle(@Arg('id', () => ID) id: string): Promise<Article> {
    const article = await ArticleModel.findByIdAndDelete(id);
    if (!article) throw new ApolloError('article not found');
    await deleteFile(article.media);

    return article;
  }
}
