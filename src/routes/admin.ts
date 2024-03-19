import { Router, Request, Response } from "express";
import * as auth from '../controllers/auth'
import * as authmiddleware from '../middlewares/auth'
import * as events from '../controllers/events'
import * as groups from '../controllers/groups'

const router = Router();

router.get('/ping', authmiddleware.validateLogin, (req: Request, res: Response) => res.json({ pong: true, admin: true }));
router.post('/login', auth.login);

router.get('/events', authmiddleware.validateLogin, events.getAll)
router.get('/events/:id', authmiddleware.validateLogin, events.getEvent)
router.post('/events', authmiddleware.validateLogin, events.addEvent)
router.put('/events/:id', authmiddleware.validateLogin, events.updateEvent)
router.delete('/events/:id', authmiddleware.validateLogin, events.deleteEvent)

router.get('/events/:id_event/groups', authmiddleware.validateLogin, groups.getAll);
router.get('/events/:id_event/groups/:id', authmiddleware.validateLogin, groups.getGroup);
router.post('/events/:id_event/groups', authmiddleware.validateLogin, groups.addGroup);


export default router;