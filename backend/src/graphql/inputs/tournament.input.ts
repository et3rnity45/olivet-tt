import { InputType, Field } from 'type-graphql';
import { Tournament } from '../../entities/tournament.entity';

@InputType()
export default class TournamentInput implements Partial<Tournament> {
  @Field()
  name!: string;

  @Field()
  isActive!: boolean;

  rulesFile!: string;

  helloAssoForm!: string;
}
