import {
  Resolver, Query, Arg, ID, Mutation, Authorized,
} from 'type-graphql';
import { GraphQLError } from 'graphql';
import UserInput from '../inputs/user.input';
import { User, UserModel } from '../../entities/user.entity';

@Resolver(User)
export default class UserResolver {
  @Authorized()
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await UserModel.find().exec();

    return users;
  }

  @Authorized()
  @Query(() => User)
  async user(@Arg('id', () => ID) id: string): Promise<User> {
    const user = await UserModel.findById(id).exec();

    if (!user) throw new GraphQLError('user not found');

    return user;
  }

  @Authorized()
  @Mutation(() => User)
  async updateUser(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: UserInput,
  ): Promise<User> {
    const user = await UserModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!user) throw new GraphQLError('user not found');

    return user;
  }

  @Authorized()
  @Mutation(() => User)
  async deleteUser(@Arg('id', () => ID) id: string): Promise<User> {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) throw new GraphQLError('user not found');

    return user;
  }
}
