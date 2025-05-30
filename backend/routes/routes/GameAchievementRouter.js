import { Router } from 'express';
import { GameAchievementController } from '../../controllers/GameAchievementController.js';

const router = Router();

router.get('/', GameAchievementController.getAll);
router.get('/game/:game_id', GameAchievementController.getByGame);
router.post('/', GameAchievementController.create);

export default router;
