import { InputType, Field } from 'type-graphql';
import { User } from '../../entities/user.entity';

@InputType()
export default class LoginInput implements Partial<User> {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
