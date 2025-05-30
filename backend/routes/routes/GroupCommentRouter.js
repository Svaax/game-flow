import { Router } from 'express';
import { GroupCommentController } from '../../controllers/GroupCommentController.js';

const router = Router();

router.get('/post/:post_id', GroupCommentController.getByPost);
// router.get('/:id', GroupCommentController.getById);
router.post('/', GroupCommentController.create);
// router.put('/:id', GroupCommentController.update);
// router.delete('/:id', GroupCommentController.delete);

export default router;
