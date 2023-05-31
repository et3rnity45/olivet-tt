import {
  Resolver, Query, Arg, ID, Mutation, Authorized,
} from 'type-graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { GraphQLError } from 'graphql';
import TrainerInput from '../inputs/trainer.input';
import { Trainer, TrainerModel } from '../../entities/trainer.entity';
import { uploadFile, deleteFile } from '../../utils/UploadFile';

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
    } catch (err: any) {
      if (err.name === 'MongoError' && err.code === 11000) {
        deleteFile(trainer.media);
        throw new GraphQLError('duplicate value');
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
    const currentTrainer = await TrainerModel.findById(id);
    if (!currentTrainer) throw new GraphQLError('trainer not found');

    let { media } = currentTrainer;
    if (file) {
      deleteFile(currentTrainer.media);
      media = await uploadFile(file);
    }
    const trainer = await TrainerModel.findByIdAndUpdate(id, { ...input, media }, { new: true });
    if (!trainer) throw new GraphQLError('article not found');

    return trainer;
  }

  @Authorized()
  @Mutation(() => Trainer)
  async deleteTrainer(@Arg('id', () => ID) id: string): Promise<Trainer> {
    const trainer = await TrainerModel.findByIdAndDelete(id);
    if (!trainer) throw new GraphQLError('trainer not found');
    await deleteFile(trainer.media);

    return trainer;
  }
}
