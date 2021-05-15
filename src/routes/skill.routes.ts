import * as express from 'express';
import { add, get, put, getOne, remove } from '../controllers/skill.controller';

const router = express.Router();

router.get('/:system_id', get);
router.get('/:system_id/:skill_id', getOne);
router.post('/:system_id', add);
router.put('/:skill_id', put);
router.delete('/:skill_id', remove);

export default router;
