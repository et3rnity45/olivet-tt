import {
  Resolver, Query, Arg, Mutation, Authorized,
} from 'type-graphql';
import * as argon2 from 'argon2';
import { AuthenticationError } from 'apollo-server';
import { generateToken } from '../../utils/auth';
import { UserModel } from '../../entities/user.entity';
import LoginInput from '../inputs/login.input';
import UserInput from '../inputs/user.input';
import Token from '../types/token.type';

@Resolver(Token)
export default class LoginResolver {
  @Query(() => Token)
  async login(@Arg('input') input: LoginInput): Promise<Token> {
    const { email, password } = input;

    const user = await UserModel.findOne({ email }).exec();
    if (!user) throw new AuthenticationError('Email inconnu.');

    const correctPassword = await argon2.verify(user.password, password);
    if (!correctPassword) throw new AuthenticationError('Mot de passe incorrect.');

    return { token: generateToken(user) };
  }

  // @Authorized()
  @Mutation(() => Token)
  async register(@Arg('input') input: UserInput): Promise<Token> {
    const { email, password } = input;

    const user = await UserModel.findOne({ email }).exec();
    if (user) throw new Error('Email déjà utilisé.');

    const hashPassword = await argon2.hash(password);
    const newUser = new UserModel({ ...input, password: hashPassword });

    await newUser.save();

    return { token: generateToken(newUser) };
  }
}
