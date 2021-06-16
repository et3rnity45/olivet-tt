import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Team } from './team.entity';

@ObjectType()
export class Poule {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, required: true })
  libequipe!: string;

  @Field()
  @Prop({ trim: true, required: true })
  libdivision!: string;

  @Field()
  @Prop({ trim: true, required: true })
  liendivision!: string;

  @Field(() => [Team], { nullable: true })
  @Prop({ ref: Team })
  teams?: Ref<Team>[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const PouleModel = getModelForClass(Poule, {
  schemaOptions: { timestamps: true },
});
