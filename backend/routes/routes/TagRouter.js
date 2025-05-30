import { Router } from 'express';
import { TagController } from '../../controllers/TagController.js';

const router = Router();

router.get('/', TagController.getAllTags);
router.post('/', TagController.createTag);
router.delete('/:id', TagController.deleteTag);

export default router;
