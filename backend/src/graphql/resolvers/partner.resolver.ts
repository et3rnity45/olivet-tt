import {
  Resolver, Query, Arg, ID, Mutation,
} from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ApolloError } from 'apollo-server-express';
import PartnerInput from '@Inputs/partner.input';
import { Partner, PartnerModel } from '@Entities/partner.entity';
import { uploadFile, deleteFile } from '@Utils/UploadFile';

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

  @Mutation(() => Partner)
  async createPartner(
    @Arg('input') input: PartnerInput,
      @Arg('file', () => GraphQLUpload) file: FileUpload,
  ): Promise<Partner> {
    const media = await uploadFile(file);
    const partner = new PartnerModel({ ...input, media });

    try {
      await partner.save();
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        deleteFile(partner.media);
        throw new ApolloError('duplicate value');
      }
    }

    return partner;
  }

  @Mutation(() => Partner)
  async updatePartner(
    @Arg('id', () => ID) id: string,
      @Arg('input') input: PartnerInput,
      @Arg('file', () => GraphQLUpload, { nullable: true }) file?: FileUpload,
  ): Promise<Partner> {
    let media;
    if (file) media = await uploadFile(file);

    const partner = await PartnerModel.findByIdAndUpdate(id, { ...input, media });
    if (!partner) throw new ApolloError('partner not found');
    deleteFile(partner.media);

    return partner;
  }

  @Mutation(() => Partner)
  async deletePartner(@Arg('id', () => ID) id: string): Promise<Partner> {
    const partner = await PartnerModel.findByIdAndDelete(id);
    if (partner) {
      deleteFile(partner.media);
    } else {
      throw new ApolloError('partner not found');
    }

    return partner;
  }
}
