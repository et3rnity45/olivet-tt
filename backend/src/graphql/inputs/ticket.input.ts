import { InputType, Field } from 'type-graphql';
import { Ticket } from '../../entities/ticket.entity';

@InputType()
export default class TicketInput implements Partial<Ticket> {
  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  email!: string;

  @Field()
  phone!: string;

  @Field()
  licence!: number;

  @Field()
  hasPaid!: boolean;

  @Field()
  bracket!: string;
}
