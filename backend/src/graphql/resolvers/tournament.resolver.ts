import {
  Resolver, Query, Arg, ID, Mutation, Authorized,
} from 'type-graphql';
import { GraphQLError } from 'graphql';
import TournamentInput from '../inputs/tournament.input';
import { Tournament, TournamentModel } from '../../entities/tournament.entity';

@Resolver(Tournament)
export default class TournamentResolver {
  @Authorized()
  @Query(() => [Tournament])
  async tournaments(): Promise<Tournament[]> {
    const tournaments = await TournamentModel.find().exec();

    return tournaments;
  }

  @Authorized()
  @Query(() => Tournament)
  async tournament(@Arg('id', () => ID) id: string): Promise<Tournament> {
    const tournament = await TournamentModel.findById(id).exec();

    if (!tournament) throw new GraphQLError('tournament not found');

    return tournament;
  }

  @Authorized()
  @Mutation(() => Tournament)
  async updateTournament(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: TournamentInput,
  ): Promise<Tournament> {
    const tournament = await TournamentModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!tournament) throw new GraphQLError('tournament not found');

    return tournament;
  }

  @Authorized()
  @Mutation(() => Tournament)
  async deleteUser(@Arg('id', () => ID) id: string): Promise<Tournament> {
    const tournament = await TournamentModel.findByIdAndDelete(id);
    if (!tournament) throw new GraphQLError('user not found');

    return tournament;
  }
}
