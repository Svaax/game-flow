import { Router } from 'express';
import { GuideController } from '../../controllers/GuideController.js';

const router = Router();

router.get('/', GuideController.getAll);
router.get('/:id', GuideController.getById);
// router.get('/game/:game_id', GuideController.getByGame);
// router.get('/user/:user_id', GuideController.getByUser);
router.post('/', GuideController.create);
router.put('/:id', GuideController.update);
router.delete('/:id', GuideController.delete);

export default router;
