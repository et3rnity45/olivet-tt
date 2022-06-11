import { ObjectType, Field, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Ticket {
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
  email!: string;

  @Field()
  @Prop({ trim: true, required: true })
  phone!: string;

  @Field()
  @Prop({ required: true })
  licence!: number;

  @Field()
  @Prop({ required: true })
  hasPaid!: boolean;

  @Field()
  @Prop({ required: true })
  bracket!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const TicketModel = getModelForClass(Ticket, {
  schemaOptions: { timestamps: true },
});
