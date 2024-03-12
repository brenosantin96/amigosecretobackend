import { Router, Request, Response } from "express";
import * as auth from '../controllers/auth'

const router = Router();

router.get('/ping', (req: Request, res: Response) => res.json({ pong: 'true' }));
router.post('/login', auth.login);

export default router;