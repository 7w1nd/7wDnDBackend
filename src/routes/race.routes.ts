import * as express from 'express';
import { add, get, put, getOne, remove } from '../controllers/race.controller';

const router = express.Router();

router.get('/:system_id', get);
router.get('/:system_id/:race_id', getOne);
router.post('/:system_id', add);
router.put('/:race_id', put);
router.delete('/:race_id', remove);

export default router;
