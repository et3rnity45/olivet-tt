import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class Token {
  @Field()
  token!: string;
}
