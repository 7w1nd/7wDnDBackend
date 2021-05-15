import * as express from 'express';
import { add, get, put, remove } from '../controllers/race.trait.controller';

const router = express.Router();

router.get('/:race_id', get);
router.post('/:race_id', add);
router.put('/:race_trait_id', put);
router.delete('/:race_trait_id', remove);

export default router;
