import {
  Resolver, Query, Arg, ID, Mutation, Authorized,
} from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import TicketInput from '../inputs/ticket.input';
import { Ticket, TicketModel } from '../../entities/ticket.entity';

@Resolver(Ticket)
export default class TicketResolver {
  @Query(() => [Ticket])
  async tickets(): Promise<Ticket[]> {
    const tickets = await TicketModel.find().exec();

    return tickets;
  }

  @Query(() => Ticket)
  async ticket(@Arg('id', () => ID) id: string): Promise<Ticket> {
    const ticket = await TicketModel.findById(id).exec();

    if (!ticket) throw new ApolloError('ticket not found');

    return ticket;
  }

  @Authorized()
  @Mutation(() => Ticket)
  static async createTicket(
    @Arg('input') input: TicketInput,
  ): Promise<Ticket> {
    const ticket = new TicketModel(input);

    try {
      await ticket.save();
    } catch (err: any) {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ApolloError('duplicate value');
      }
    }

    return ticket;
  }

  @Authorized()
  @Mutation(() => Ticket)
  async updateTicket(
    @Arg('id', () => ID) id: string,
      @Arg('input') input: TicketInput,
  ): Promise<Ticket> {
    const ticket = await TicketModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!ticket) throw new ApolloError('ticket not found');

    return ticket;
  }

  @Authorized()
  @Mutation(() => Ticket)
  async deleteTicket(@Arg('id', () => ID) id: string): Promise<Ticket> {
    const ticket = await TicketModel.findByIdAndDelete(id);
    if (!ticket) throw new ApolloError('ticket not found');

    return ticket;
  }
}
