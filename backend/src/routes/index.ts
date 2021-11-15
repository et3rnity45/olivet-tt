import { Router } from 'express';

const router = Router();
router.post('/helloasso', (req, res) => res.send(req.body));

export default router;
