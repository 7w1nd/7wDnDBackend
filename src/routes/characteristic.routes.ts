import * as express from 'express';
import { add, get, put, getOne, remove } from '../controllers/characteristic.controller';

const router = express.Router();

router.get('/:system_id', get);
router.get('/:system_id/:short_name', getOne);
router.post('/:system_id', add);
router.put('/:characteristic_id', put);
router.delete('/:characteristic_id', remove);

export default router;
