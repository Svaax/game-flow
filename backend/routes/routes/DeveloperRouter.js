import { Router } from 'express';
import { DeveloperController } from '../../controllers/DeveloperController.js';

const router = Router();

router.get('/', DeveloperController.getAll);
router.get('/:id', DeveloperController.getById);
router.post('/', DeveloperController.create);
router.put('/:id', DeveloperController.update);
router.delete('/:id', DeveloperController.delete);

export default router;
