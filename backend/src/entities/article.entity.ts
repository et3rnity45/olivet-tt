/* eslint-disable func-names */
import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Article {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, unique: true, required: true })
  title!: string;

  @Field()
  @Prop({ trim: true, required: true })
  category!: string;

  @Field()
  @Prop({ trim: true, required: true })
  content!: string;

  @Field()
  @Prop({ trim: true, required: true })
  media!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const ArticleModel = getModelForClass(Article, {
  schemaOptions: { timestamps: true },
});
