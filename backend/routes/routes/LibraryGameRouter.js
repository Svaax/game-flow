import { Router } from 'express';
import { LibraryGameController } from '../../controllers/LibraryGameController.js';

const router = Router();

router.get('/', LibraryGameController.getAll);
router.get('/user/:user_id', LibraryGameController.getByUser);
router.post('/', LibraryGameController.addGame);
router.put('/:user_id/:game_id', LibraryGameController.updateGame);

export default router;
