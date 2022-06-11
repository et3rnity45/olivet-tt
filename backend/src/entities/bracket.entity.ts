import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Bracket {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, required: true })
  letter!: string;

  @Field()
  @Prop({ trim: true, required: true })
  name!: string;

  @Field()
  @Prop({ required: true })
  price!: number;

  @Field()
  @Prop({ required: true })
  entries!: number;

  @Field()
  @Prop({ required: true })
  remainingEntries!: number;

  @Field()
  @Prop({ trim: true, required: true })
  start!: string;

  @Field()
  @Prop({ trim: true, required: true })
  prize1!: string;

  @Field()
  @Prop({ trim: true, required: true })
  prize2!: string;

  @Field()
  @Prop({ trim: true, required: true })
  prize3!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const BracketModel = getModelForClass(Bracket, {
  schemaOptions: { timestamps: true },
});
