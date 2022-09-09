import { ObjectType, Field } from 'type-graphql';
import { Bracket } from '../../entities/bracket.entity';

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

  @Field(() => [Bracket])
  brackets!: Bracket[];
}
