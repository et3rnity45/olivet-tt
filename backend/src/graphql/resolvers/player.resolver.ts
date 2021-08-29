import {
  Resolver, Query, Arg, ID, Mutation, Authorized,
} from 'type-graphql';
import { Player, PlayerModel } from '@Entities/player.entity';
import { getClubPlayers } from '@Utils/FFTTApiRequest';

@Resolver(Player)
export default class PlayerResolver {
  @Query(() => [Player])
  async players(): Promise<Player[]> {
    const players = await PlayerModel.find().sort('-point').exec();

    return players;
  }

  @Query(() => Player)
  async player(@Arg('id', () => ID) id: string): Promise<Player> {
    const player = await PlayerModel.findById(id).exec();

    if (!player) throw new Error('player not found');

    return player;
  }

  @Authorized()
  @Mutation(() => [Player])
  async updateAllPlayers(): Promise<Player[]> {
    await PlayerModel.deleteMany({});
    const players = await PlayerModel.insertMany(await getClubPlayers());
    return players;
  }
}
