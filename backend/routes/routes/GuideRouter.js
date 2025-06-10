import { Router } from 'express';
import { GuideController } from '../../controllers/GuideController.js';

const router = Router();

router.get('/', GuideController.getAllGuides);
router.get('/:id', GuideController.getById);
// router.get('/game/:game_id', GuideController.getByGame);
// router.get('/user/:user_id', GuideController.getByUser);
router.post('/', GuideController.createGuide);
router.put('/:id', GuideController.updateGuide);
router.delete('/:id', GuideController.deleteGuide);

export default router;
