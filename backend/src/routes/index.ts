import { Router } from 'express';

const router = Router();
router.post('/hello-asso', (req, res) => res.send(req.body));

export default router;
