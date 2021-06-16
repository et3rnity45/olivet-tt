import { InputType, Field } from 'type-graphql';
import { Partner } from '@Entities/partner.entity';

@InputType()
export default class PartnerInput implements Partial<Partner> {
  @Field()
  name!: string;

  @Field()
  url!: string;

  media!: string;
}
