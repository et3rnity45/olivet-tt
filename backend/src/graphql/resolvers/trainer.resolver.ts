import {
  Resolver, Query, Arg, ID, Mutation, Authorized,
} from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ApolloError } from 'apollo-server-express';
import TrainerInput from '@Inputs/trainer.input';
import { Trainer, TrainerModel } from '@Entities/trainer.entity';
import { uploadFile, deleteFile } from '@Utils/UploadFile';

@Resolver(Trainer)
export default class TrainerResolver {
  @Query(() => [Trainer])
  async trainers(): Promise<Trainer[]> {
    const trainers = await TrainerModel.find().exec();

    return trainers;
  }

  @Query(() => Trainer)
  async trainer(@Arg('id', () => ID) id: string): Promise<Trainer> {
    const trainer = await TrainerModel.findById(id).exec();

    if (!trainer) throw new Error('trainer not found');

    return trainer;
  }

  @Authorized()
  @Mutation(() => Trainer)
  async createTrainer(
    @Arg('input') input: TrainerInput,
      @Arg('file', () => GraphQLUpload) file: FileUpload,
  ): Promise<Trainer> {
    const media = await uploadFile(file);
    const trainer = new TrainerModel({ ...input, media });

    try {
      await trainer.save();
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        deleteFile(trainer.media);
        throw new ApolloError('duplicate value');
      }
    }

    return trainer;
  }

  @Authorized()
  @Mutation(() => Trainer)
  async updateTrainer(
    @Arg('id', () => ID) id: string,
      @Arg('input') input: TrainerInput,
      @Arg('file', () => GraphQLUpload, { nullable: true }) file?: FileUpload,
  ): Promise<Trainer> {
    let media;
    if (file) media = await uploadFile(file);

    const trainer = await TrainerModel.findByIdAndUpdate(id, { ...input, media });
    if (!trainer) throw new ApolloError('trainer not found');
    deleteFile(trainer.media);

    return trainer;
  }

  @Authorized()
  @Mutation(() => Trainer)
  async deleteTrainer(@Arg('id', () => ID) id: string): Promise<Trainer> {
    const trainer = await TrainerModel.findByIdAndDelete(id);
    if (trainer) {
      deleteFile(trainer.media);
    } else {
      throw new ApolloError('trainer not found');
    }

    return trainer;
  }
}
