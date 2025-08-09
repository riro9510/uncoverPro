import { Router } from 'express';
const router = Router();
import cvrequest from './cvrequest.route.js';
import extras from './extras.route.js';
import formquestions from './formquestions.route.js';
import language from './language.route.js';
router.use('/cvrequest', cvrequest);
router.use('/extras', extras);
router.use('/formquestions', formquestions);
router.use('/language', language);

export default router;
