import { InputType, Field } from 'type-graphql';
import { Article } from '@Entities/article.entity';

@InputType()
export default class ArticleInput implements Partial<Article> {
  @Field()
  title!: string;

  @Field()
  category!: string;

  @Field()
  content!: string;

  media!: string;
}
