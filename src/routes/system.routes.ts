import * as express from 'express';
import { get } from '../controllers/system.controller';

const router = express.Router();

router.get('/', get);

export default router;
