import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Team {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, required: true })
  clt!: string;

  @Field()
  @Prop({ trim: true, required: true })
  equipe!: string;

  @Field()
  @Prop({ required: true })
  joue!: number;

  @Field()
  @Prop({ required: true })
  pts!: number;

  @Field()
  @Prop({ required: true })
  numero!: number;

  @Field()
  @Prop({ required: true })
  vic!: number;

  @Field()
  @Prop({ required: true })
  def!: number;

  @Field()
  @Prop({ required: true })
  nul!: number;

  @Field()
  @Prop({ required: true })
  pf!: number;

  @Field()
  @Prop({ required: true })
  pg!: number;

  @Field()
  @Prop({ required: true })
  pp!: number;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const TeamModel = getModelForClass(Team, {
  schemaOptions: { timestamps: true },
});
