import { Router } from 'express';
import { GameTagController } from '../../controllers/GameTagController.js';

const router = Router();

// router.get('/game/:game_id', GameTagController.getByGame);
router.post('/', GameTagController.addTagToGame);
router.delete('/:game_id/:tag_id', GameTagController.removeTagFromGame);

export default router;
