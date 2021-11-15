import { Router } from 'express';

const router = Router();
router.post('/helloasso', (req, res) => {
  console.log(req.body);
  res.send({
    success: 'Bien reçu !',
  });
});

export default router;
