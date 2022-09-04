import { InputType, Field } from 'type-graphql';
import { Bracket } from '../../entities/bracket.entity';

@InputType()
export default class BracketInput implements Partial<Bracket> {
  @Field()
  letter!: string;

  @Field()
  name!: string;

  @Field()
  price!: number;

  @Field()
  entries!: number;

  @Field()
  start!: string;

  @Field()
  maxPoints!: number;

  @Field()
  prize1!: string;

  @Field()
  prize2!: string;

  @Field()
  prize3!: string;
}
