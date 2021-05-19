import * as express from 'express';
import { add, get, put, detail, remove } from '../controllers/race.controller';

const router = express.Router();

router.get('/:system_id', get);
router.get('/details/:race_id', detail);
router.post('/:system_id', add);
router.put('/:race_id', put);
router.delete('/:race_id', remove);

export default router;
