import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Trainer {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, required: true })
  firstname!: string;

  @Field()
  @Prop({ trim: true, required: true })
  lastname!: string;

  @Field()
  @Prop({ trim: true, required: true })
  qualification!: string;

  @Field()
  @Prop({ trim: true, required: true })
  media!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const TrainerModel = getModelForClass(Trainer, {
  schemaOptions: { timestamps: true },
});
