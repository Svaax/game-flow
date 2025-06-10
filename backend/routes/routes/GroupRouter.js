import { Router } from 'express';
import { GroupController } from '../../controllers/GroupController.js';

const router = Router();

router.get('/', GroupController.getAllGroups);
router.get('/:id', GroupController.getGroupById);
router.post('/', GroupController.createGroup);
// router.put('/:id', GroupController.update);
// router.delete('/:id', GroupController.delete);

export default router;
