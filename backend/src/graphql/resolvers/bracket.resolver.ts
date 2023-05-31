import {
  Resolver, Query, Arg, ID, Mutation, Authorized,
} from 'type-graphql';
import { GraphQLError } from 'graphql';
import BracketInput from '../inputs/bracket.input';
import { Bracket, BracketModel } from '../../entities/bracket.entity';
import EntriesActionsEnum from '../types/EntriesActionsEnum';

@Resolver(Bracket)
export default class BracketResolver {
  @Query(() => [Bracket])
  async brackets(): Promise<Bracket[]> {
    const brackets = await BracketModel.find().exec();

    return brackets;
  }

  @Query(() => Bracket)
  async bracket(@Arg('id', () => ID) id: string): Promise<Bracket> {
    const bracket = await BracketModel.findById(id).exec();

    if (!bracket) throw new GraphQLError('bracket not found');

    return bracket;
  }

  @Authorized()
  @Mutation(() => Bracket)
  async createBracket(
    @Arg('input') input: BracketInput,
  ): Promise<Bracket> {
    const bracket = new BracketModel({ ...input, remainingEntries: input.entries });

    try {
      await bracket.save();
    } catch (err: any) {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new GraphQLError('duplicate value');
      }
    }

    return bracket;
  }

  @Authorized()
  @Mutation(() => Bracket)
  async updateBracket(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: BracketInput,
  ): Promise<Bracket> {
    const bracket = await BracketModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!bracket) throw new GraphQLError('bracket not found');

    return bracket;
  }

  @Authorized()
  @Mutation(() => Bracket)
  async deleteBracket(@Arg('id', () => ID) id: string): Promise<Bracket> {
    const bracket = await BracketModel.findByIdAndDelete(id);
    if (!bracket) throw new GraphQLError('bracket not found');

    return bracket;
  }

  static async updateEntries(letter: string, action: EntriesActionsEnum): Promise<void> {
    const bracket = await BracketModel.findOne({ letter });
    if (!bracket) return;

    const newEntries = bracket.remainingEntries + (action === EntriesActionsEnum.ADD ? 1 : -1);
    await BracketModel.findOneAndUpdate({ letter },
      { remainingEntries: newEntries }, { new: true });
  }
}
