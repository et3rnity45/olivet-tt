import {
  Resolver, Query, Arg, ID, Mutation, Authorized,
} from 'type-graphql';
import { Team, TeamModel } from '../../entities/team.entity';
import { Poule, PouleModel } from '../../entities/poule.entity';
import { getPoules, getTeamsWithResult } from '../../utils/FFTTApiRequest';

@Resolver(Poule)
export default class PouleResolver {
  @Query(() => [Poule])
  async poules(): Promise<Poule[]> {
    const poules = await PouleModel.find().populate('teams').exec();

    return poules;
  }

  @Query(() => Poule)
  async poule(@Arg('id', () => ID) id: string): Promise<Poule> {
    const poule = await PouleModel.findById(id).populate('teams').exec();

    if (!poule) throw new Error('poule not found');

    return poule;
  }

  @Authorized()
  @Mutation(() => [Poule])
  async updateAllPoules(): Promise<Poule[]> {
    await PouleModel.deleteMany({});
    await TeamModel.deleteMany({});

    let poules = await getPoules();
    poules = await Promise.all(poules
      .filter((poule) => poule.libepr.startsWith('FED_Championnat') && poule.libequipe.includes('Phase 2'))
      .map(async (poule) => {
        const teams: Team[] = await TeamModel.insertMany(await getTeamsWithResult(poule));
        const newPoule: Poule = poule;
        newPoule.teams = teams;
        return newPoule;
      }));
    const finalPoules = await PouleModel.insertMany(poules);
    return finalPoules;
  }
}
