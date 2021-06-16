import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Player {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, required: true })
  licence!: string;

  @Field()
  @Prop({ trim: true, required: true })
  nom!: string;

  @Field()
  @Prop({ trim: true, required: true })
  prenom!: string;

  @Field()
  @Prop({ trim: true, required: true })
  club!: string;

  @Field()
  @Prop({ required: true })
  nclub!: number;

  @Field({ nullable: true })
  @Prop({ trim: true })
  natio?: string;

  @Field()
  @Prop({ required: true })
  clglob!: number;

  @Field()
  @Prop({ required: true })
  point!: number;

  @Field()
  @Prop({ required: true })
  aclglob!: number;

  @Field()
  @Prop({ required: true })
  apoint!: number;

  @Field()
  @Prop({ trim: true, required: true })
  clast!: string;

  @Field()
  @Prop({ required: true })
  clnat!: number;

  @Field()
  @Prop({ trim: true, required: true })
  categ!: string;

  @Field()
  @Prop({ required: true })
  rangreg!: number;

  @Field()
  @Prop({ required: true })
  rangdep!: number;

  @Field()
  @Prop({ required: true })
  valcla!: number;

  @Field()
  @Prop({ trim: true, required: true })
  clpro!: string;

  @Field()
  @Prop({ required: true })
  valinit!: number;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const PlayerModel = getModelForClass(Player, {
  schemaOptions: { timestamps: true },
});
