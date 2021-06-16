import {
  Resolver, Query, Arg, ID, Mutation,
} from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import UserInput from '@Inputs/user.input';
import { User, UserModel } from '@Entities/user.entity';

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await UserModel.find().exec();

    return users;
  }

  @Query(() => User)
  async user(@Arg('id', () => ID) id: string): Promise<User> {
    const user = await UserModel.findById(id).exec();

    if (!user) throw new ApolloError('user not found');

    return user;
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: UserInput): Promise<User> {
    const user = new UserModel(input);

    await user.save();

    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg('id', () => ID) id: string,
      @Arg('input') input: UserInput,
  ): Promise<User> {
    const user = await UserModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!user) throw new ApolloError('user not found');

    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Arg('id', () => ID) id: string): Promise<User> {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) throw new ApolloError('user not found');

    return user;
  }
}
