import { Router } from 'express';
import { GroupController } from '../../controllers/GroupController.js';

const router = Router();

router.get('/', GroupController.getAll);
// router.get('/:id', GroupController.getById);
router.post('/', GroupController.create);
// router.put('/:id', GroupController.update);
// router.delete('/:id', GroupController.delete);

export default router;
