import * as express from 'express';
import { add, get, put, detail, remove } from '../controllers/characteristic.controller';

const router = express.Router();

router.get('/:system_id', get);
router.get('/details/:characteristic_id', detail);
router.post('/:system_id', add);
router.put('/:characteristic_id', put);
router.delete('/:characteristic_id', remove);

export default router;
