import * as express from 'express';
import { add, get, put, getOne, remove } from '../controllers/character.controller';

const router = express.Router({ mergeParams: true });

router.get('/:system_id', get);
router.get('/:system_id/:character_id', getOne);
router.post('/:system_id', add);
router.put('/:character_id', put);
router.delete('/:character_id', remove);

export default router;
