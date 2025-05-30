import { Router } from 'express';
import { GameController } from '../../controllers/GameController.js';
import upload from '../../middleware/upload.js';

const router = Router();

router.get('/', GameController.getAllGames);
router.get('/:id', GameController.getGameById);
router.post('/', upload.single('cover_image'), GameController.createGame);
router.put('/:id', upload.single('cover_image'), GameController.updateGame);
router.delete('/:id', GameController.deleteGame);

export default router;
