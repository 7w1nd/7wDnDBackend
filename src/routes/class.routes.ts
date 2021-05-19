import * as express from 'express';
import { add, get, put, detail, remove } from '../controllers/class.controller';

const router = express.Router();

router.get('/:system_id', get);
router.get('/details/:class_id', detail);
router.post('/:system_id', add);
router.put('/:class_id', put);
router.delete('/:class_id', remove);

export default router;
