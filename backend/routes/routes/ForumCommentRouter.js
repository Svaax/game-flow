import { Router } from 'express';
import { ForumCommentController } from '../../controllers/ForumCommentController.js';

const router = Router();

router.get('/post/:post_id', ForumCommentController.getByPost); // Comments on forum post
// router.get('/:id', ForumCommentController.getById);
router.post('/', ForumCommentController.create);
// router.put('/:id', ForumCommentController.update);
// router.delete('/:id', ForumCommentController.delete);

export default router;
