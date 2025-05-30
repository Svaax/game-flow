import { Router } from 'express';
import { WishlistGameController } from '../../controllers/WishlistGameController.js';

const router = Router();

router.get('/wishlist/:wishlist_id', WishlistGameController.getWishlistGames);
router.post('/', WishlistGameController.addGame);
router.delete('/:wishlist_id/:game_id', WishlistGameController.removeGame);

export default router;
