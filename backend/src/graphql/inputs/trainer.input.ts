import { InputType, Field } from 'type-graphql';
import { Trainer } from '../../entities/trainer.entity';

@InputType()
export default class TrainerInput implements Partial<Trainer> {
  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  qualification!: string;

  media!: string;
}
