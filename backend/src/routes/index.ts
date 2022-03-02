import { Router } from 'express';
import TicketResolver from '../graphql/resolvers/ticket.resolver';
import TicketInput from '../graphql/inputs/ticket.input';

const router = Router();
router.post('/helloasso', (req, res) => {
  if (req.body.eventType === 'Order') {
    const { data } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.items.forEach(async (item: any) => {
      const ticket: TicketInput = {
        firstname: item.user.firstName as string,
        lastname: item.user.lastName as string,
        email: item.customFields[1].answer as string,
        phone: item.customFields[2].answer as string,
        licence: item.customFields[0].answer as string,
        bracket: item.name as string,
        hasPaid: true,
      };
      await TicketResolver.createTicket(ticket);
    });
  }
  return res.send(req.body);
});

export default router;
