import { Router } from 'express';
import { GroupPostController } from '../../controllers/GroupPostController.js';

const router = Router();

// router.get('/group/:group_id', GroupPostController.getByGroup);
// router.get('/:id', GroupPostController.getById);
router.post('/', GroupPostController.create);
// router.put('/:id', GroupPostController.update);
// router.delete('/:id', GroupPostController.delete);

export default router;
