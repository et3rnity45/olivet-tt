import { InputType, Field } from 'type-graphql';
import { User } from '@Entities/user.entity';

@InputType()
export default class UserInput implements Partial<User> {
  @Field({ nullable: true })
  avatar?: string;

  @Field(() => String)
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}
