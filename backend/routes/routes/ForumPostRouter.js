import { Router } from 'express';
import { ForumPostController } from '../../controllers/ForumPostController.js';

const router = Router();

router.get('/', ForumPostController.getAllPosts);
// router.get('/:id', ForumPostController.getById);
// router.get('/user/:user_id', ForumPostController.getByUser);
router.post('/', ForumPostController.createPost);
// router.put('/:id', ForumPostController.update);
// router.delete('/:id', ForumPostController.delete);

export default router;
