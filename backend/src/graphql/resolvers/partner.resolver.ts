import {
  Resolver, Query, Arg, ID, Mutation, Authorized,
} from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { GraphQLError } from 'graphql';
import PartnerInput from '../inputs/partner.input';
import { Partner, PartnerModel } from '../../entities/partner.entity';
import { uploadFile, deleteFile } from '../../utils/UploadFile';

@Resolver(Partner)
export default class PartnerResolver {
  @Query(() => [Partner])
  async partners(): Promise<Partner[]> {
    const partners = await PartnerModel.find().exec();

    return partners;
  }

  @Query(() => Partner)
  async partner(@Arg('id', () => ID) id: string): Promise<Partner> {
    const partner = await PartnerModel.findById(id).exec();

    if (!partner) throw new Error('partner not found');

    return partner;
  }

  @Authorized()
  @Mutation(() => Partner)
  async createPartner(
    @Arg('input') input: PartnerInput,
    @Arg('file', () => GraphQLUpload) file: FileUpload,
  ): Promise<Partner> {
    const media = await uploadFile(file);
    const partner = new PartnerModel({ ...input, media });

    try {
      await partner.save();
    } catch (err: any) {
      if (err.name === 'MongoError' && err.code === 11000) {
        deleteFile(partner.media);
        throw new GraphQLError('duplicate value');
      }
    }

    return partner;
  }

  @Authorized()
  @Mutation(() => Partner)
  async updatePartner(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: PartnerInput,
    @Arg('file', () => GraphQLUpload, { nullable: true }) file?: FileUpload,
  ): Promise<Partner> {
    const currentPartner = await PartnerModel.findById(id);
    if (!currentPartner) throw new GraphQLError('partner not found');

    let { media } = currentPartner;
    if (file) {
      deleteFile(currentPartner.media);
      media = await uploadFile(file);
    }
    const partner = await PartnerModel.findByIdAndUpdate(id, { ...input, media }, { new: true });
    if (!partner) throw new GraphQLError('article not found');

    return partner;
  }

  @Authorized()
  @Mutation(() => Partner)
  async deletePartner(@Arg('id', () => ID) id: string): Promise<Partner> {
    const partner = await PartnerModel.findByIdAndDelete(id);
    if (!partner) throw new GraphQLError('partner not found');
    await deleteFile(partner.media);

    return partner;
  }
}
