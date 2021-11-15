import { Router } from 'express';

const router = Router();
router.post('/helloasso', (req, res) => {
  res.send({
    success: req.body,
  });
});

export default router;
