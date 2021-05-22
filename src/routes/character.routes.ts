import * as express from 'express';
import { add, get, put, detail, remove } from '../controllers/character.controller';

const router = express.Router({ mergeParams: true });

router.get('/', get);
router.get('/:character_id', detail);
router.post('/:system_id', add);
router.put('/:character_id', put);
router.delete('/:character_id', remove);

export default router;
