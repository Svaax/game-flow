import { Router } from 'express';
import { PublisherController } from '../../controllers/PublisherController.js';

const router = Router();

router.get('/', PublisherController.getAll);
router.get('/:id', PublisherController.getById);
router.post('/', PublisherController.create);
router.put('/:id', PublisherController.update);
router.delete('/:id', PublisherController.delete);

export default router;
