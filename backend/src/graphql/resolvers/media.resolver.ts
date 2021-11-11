import {
  Resolver, Query, Arg, Mutation, Authorized,
} from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { uploadFile, deleteFile, getFiles } from '../../utils/UploadFile';

@Resolver()
export default class MediaResolver {
  @Query(() => [String])
  async medias(): Promise<(string | undefined)[] | undefined> {
    const medias = await getFiles();

    return medias;
  }

  @Authorized()
  @Mutation(() => String)
  async addMedia(@Arg('file', () => GraphQLUpload) file: FileUpload): Promise<string> {
    const media = await uploadFile(file);

    return media;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteMedia(@Arg('media', () => String) media: string): Promise<boolean> {
    return deleteFile(media);
  }
}
