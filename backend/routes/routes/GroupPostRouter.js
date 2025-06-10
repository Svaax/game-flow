import { Router } from 'express';
import { GroupPostController } from '../../controllers/GroupPostController.js';

const router = Router();

router.get('/', GroupPostController.getAllPostsByGroup);
router.get('/:id', GroupPostController.getById);
router.post('/', GroupPostController.createPost);
router.put('/:id', GroupPostController.updatePost);
router.delete('/:id', GroupPostController.deletePost);

export default router;
