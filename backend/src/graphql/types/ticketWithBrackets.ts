import { Bracket } from 'entities/bracket.entity';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class TicketWithBrackets {
  @Field()
  firstname?: string;

  @Field()
  lastname?: string;

  @Field()
  email?: string;

  @Field()
  licence!: string;

  @Field()
  brackets!: string[];
}
