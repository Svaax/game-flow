import express from 'express';
import { CartGameController } from '../../controllers/CartGameController.js';

const router = express.Router();

router.get('/', CartGameController.getAllCartGames);
router.get('/:id', CartGameController.getCartGameById);
router.post('/', CartGameController.addGameToCart);
router.put('/:id', CartGameController.updateCartGame);
router.delete('/:id', CartGameController.removeGameFromCart);

export default router;
