import { Resolver, Query, Arg, ID, Mutation, Authorized } from 'type-graphql';
import * as _ from 'lodash';
import { GraphQLError } from 'graphql';
import sendMail from '../../utils/mailer';
import TicketInput from '../inputs/ticket.input';
import { Ticket, TicketModel } from '../../entities/ticket.entity';
import { Bracket, BracketModel } from '../../entities/bracket.entity';
import EntriesActionsEnum from '../types/EntriesActionsEnum';
import BracketResolver from './bracket.resolver';
import { getPlayerInfo } from '../../utils/FFTTApiRequest';
import TicketWithBrackets from '../types/ticketWithBrackets';

@Resolver()
export default class TicketResolver {
  @Query(() => [Ticket])
  async tickets(): Promise<Ticket[]> {
    const tickets = await TicketModel.find().exec();

    return tickets;
  }

  @Query(() => Ticket)
  async ticket(@Arg('id', () => ID) id: string): Promise<Ticket> {
    const ticket = await TicketModel.findById(id).exec();

    if (!ticket) throw new GraphQLError('Ticket not found');

    return ticket;
  }

  @Authorized()
  @Mutation(() => Ticket)
  async createTicket(@Arg('input') input: TicketInput): Promise<Ticket> {
    const ticket = new TicketModel(input);

    try {
      await ticket.save();
      BracketResolver.updateEntries(ticket.bracket, EntriesActionsEnum.REMOVE);
    } catch (err: any) {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new GraphQLError('Duplicate value');
      }
    }

    return ticket;
  }

  @Mutation(() => Ticket)
  async createTickets(
    @Arg('input', () => [TicketInput]) tickets: TicketInput[]
  ): Promise<Ticket> {
    const createdTickets = await tickets.map(
      async (input: TicketInput): Promise<Ticket> => {
        const ticket = new TicketModel(input);
        try {
          await ticket.save();
          BracketResolver.updateEntries(
            ticket.bracket,
            EntriesActionsEnum.REMOVE
          );
        } catch (err: any) {
          if (err.name === 'MongoError' && err.code === 11000) {
            throw new GraphQLError('Duplicate value');
          }
        }

        return ticket;
      }
    );

    const bracketsLetter: string[] = tickets.map((ticket) => ticket.bracket);
    const brackets = await BracketModel.find({
      letter: { $in: bracketsLetter },
    }).exec();
    const confirmedBrackets = brackets.filter(
      (bracket) => bracket.remainingEntries > 0
    );
    const waitingList = brackets.filter(
      (bracket) => bracket.remainingEntries < 1
    );

    let html = `
      Bonjour ${tickets[0].firstname},<br> 
      Votre inscription au tournoi d'Olivet 2024 est confirmée.<br>
      Vous êtes désormais inscrit aux tableaux suivants :<br>
      <ul>
        ${confirmedBrackets
          .map(
            (bracket) => `<li>Tableau ${bracket.letter} (${bracket.name})</li>`
          )
          .join('')}
      </ul>`;
    if (waitingList.length > 0) {
      html += `
      <br>
      Vous êtes sur liste d'attente pour les tableaux suivants :<br>
      <ul>
        ${waitingList
          .map(
            (bracket) => `<li>Tableau ${bracket.letter} (${bracket.name})</li>`
          )
          .join('')}
      </ul>`;
    }

    try {
      sendMail(tickets[0].email, html);
    } catch (e) {
      sendMail('qliger.perso@gmail.com', html);
    }
    return createdTickets[0];
  }

  @Authorized()
  @Mutation(() => Ticket)
  static async createTicket2(
    @Arg('input') input: TicketInput
  ): Promise<Ticket> {
    const ticket = new TicketModel(input);

    try {
      await ticket.save();
      BracketResolver.updateEntries(ticket.bracket, EntriesActionsEnum.REMOVE);
    } catch (err: any) {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new GraphQLError('Duplicate value');
      }
    }

    return ticket;
  }

  @Authorized()
  @Mutation(() => Ticket)
  async updateTicket(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: TicketInput
  ): Promise<Ticket> {
    const ticket = await TicketModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!ticket) throw new GraphQLError('Ticket not found');

    return ticket;
  }

  @Authorized()
  @Mutation(() => Ticket)
  async deleteTicket(@Arg('id', () => ID) id: string): Promise<Ticket> {
    const ticket = await TicketModel.findByIdAndDelete(id);
    if (!ticket) throw new GraphQLError('Ticket not found');
    BracketResolver.updateEntries(ticket.bracket, EntriesActionsEnum.ADD);

    return ticket;
  }

  @Authorized()
  @Query(() => [Ticket])
  async checkAllTickets(): Promise<Ticket[]> {
    const tickets = await TicketModel.find().exec();
    const filteredTickets: Ticket[] = [];
    tickets.forEach(async (ticket) => {
      const player = await getPlayerInfo(ticket.licence.toString());
      if (!player) {
        return;
      }
      const bracket = await BracketModel.findOne({ letter: ticket.bracket });
      if (!bracket) {
        return;
      }
      if (player.valcla > bracket.maxPoints) {
        filteredTickets.push(ticket);
      }
    });

    return filteredTickets;
  }

  @Authorized()
  @Query(() => [TicketWithBrackets])
  async sendAllMails(): Promise<TicketWithBrackets[]> {
    const tickets = await TicketModel.find().exec();
    const brackets = await BracketModel.find().exec();

    const groupedTickets = _.chain(tickets)
      .groupBy('licence')
      .map((v, i) => ({
        licence: i,
        firstname: _.get(_.find(v, 'firstname'), 'firstname'),
        lastname: _.get(_.find(v, 'lastname'), 'lastname'),
        email: _.get(_.find(v, 'email'), 'email'),
        brackets: _.map(v, 'bracket'),
      }))
      .value();

    const finalTickets = groupedTickets.map((ticket) => {
      const innerBrackets = ticket.brackets.map((br) => {
        const bra: Bracket | undefined = brackets.find((b) => b.letter === br);
        if (!bra) throw new GraphQLError('Bracket not found');
        return bra;
      });
      return { ...ticket, brackets: innerBrackets };
    });

    return finalTickets;
  }
}
