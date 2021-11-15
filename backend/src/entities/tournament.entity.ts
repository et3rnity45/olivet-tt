import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Tournament {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, unique: true, required: true })
  name!: string;

  @Field()
  @Prop({ required: true })
  isActive!: boolean;

  @Field()
  @Prop({ trim: true, required: true })
  rulesFile!: string;

  @Field()
  @Prop({ trim: true, required: true })
  helloAssoForm!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const TournamentModel = getModelForClass(Tournament, {
  schemaOptions: { timestamps: true },
});
