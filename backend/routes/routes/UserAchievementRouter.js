import { Router } from 'express';
import { UserAchievementsController } from '../../controllers/UserAchievementsController.js';

const router = Router();

router.get('/', UserAchievementsController.getAll);
router.get('/user/:user_id', UserAchievementsController.getByUser);
router.post('/', UserAchievementsController.create);

export default router;
