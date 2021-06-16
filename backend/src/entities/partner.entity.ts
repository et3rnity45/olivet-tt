/* eslint-disable func-names */
import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Partner {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, unique: true, required: true })
  name!: string;

  @Field()
  @Prop({ trim: true, required: true })
  url!: string;

  @Field()
  @Prop({ trim: true, required: true })
  media!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const PartnerModel = getModelForClass(Partner, {
  schemaOptions: { timestamps: true },
});
