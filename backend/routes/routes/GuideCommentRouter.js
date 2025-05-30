import { Router } from 'express';
import { GuideCommentController } from '../../controllers/GuideCommentController.js';

const router = Router();

router.get('/guide/:guide_id', GuideCommentController.getByGuide);
// router.get('/:id', GuideCommentController.getById);
router.post('/', GuideCommentController.create);
// router.put('/:id', GuideCommentController.update);
// router.delete('/:id', GuideCommentController.delete);

export default router;
