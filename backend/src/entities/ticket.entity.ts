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

  @Prop({ trim: true, required: true })
  phone!: string;

  @Prop({ trim: true, required: true })
  licence!: string;

  @Prop({ required: true })
  hasPaid!: boolean;

  @Prop({ required: true })
  brackets!: string[];

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const TicketModel = getModelForClass(Ticket, {
  schemaOptions: { timestamps: true },
});
