import {
  Resolver, Query, Arg, ID, Mutation, Authorized,
} from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import sendMail from '../../utils/mailer';
import TicketInput from '../inputs/ticket.input';
import { Ticket, TicketModel } from '../../entities/ticket.entity';
import { BracketModel } from '../../entities/bracket.entity';
import EntriesActionsEnum from '../types/EntriesActionsEnum';
import BracketResolver from './bracket.resolver';

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
  async createTicket(
    @Arg('input') input: TicketInput,
  ): Promise<Ticket> {
    const ticket = new TicketModel(input);

    try {
      await ticket.save();
      BracketResolver.updateEntries(ticket.bracket, EntriesActionsEnum.REMOVE);
    } catch (err: any) {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ApolloError('duplicate value');
      }
    }

    return ticket;
  }

  @Mutation(() => Ticket)
  async createTickets(
    @Arg('input', () => [TicketInput]) tickets: TicketInput[],
  ): Promise<Ticket> {
    const createdTickets = await tickets.map(async (input: TicketInput): Promise<Ticket> => {
      const ticket = new TicketModel(input);
      try {
        await ticket.save();
        BracketResolver.updateEntries(ticket.bracket, EntriesActionsEnum.REMOVE);
      } catch (err: any) {
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new ApolloError('duplicate value');
        }
      }

      return ticket;
    });

    const bracketsLetter = tickets.map((ticket) => ticket.bracket);

    const brackets = await BracketModel.find({ letter: { $in: bracketsLetter } }).exec();

    const html = `
      Bonjour ${tickets[0].firstname},<br> 
      Votre inscription au tournoi d'Olivet 2022 est confirmée.<br>
      Vous êtes désormais inscrit aux tableaux suivants :<br>
      <ul>
        ${brackets.map((bracket) => `<li>Tableau ${bracket.letter} (${bracket.name})</li>`).join('')}
      </ul>`;

    // sendMail(tickets[0].email, html);
    return createdTickets[0];
  }

  @Authorized()
  @Mutation(() => Ticket)
  static async createTicket2(
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
    BracketResolver.updateEntries(ticket.bracket, EntriesActionsEnum.ADD);

    return ticket;
  }
}
