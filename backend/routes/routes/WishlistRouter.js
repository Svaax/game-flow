import { Router } from 'express';
import { WishlistController } from '../../controllers/WishlistController.js';

const router = Router();

router.get('/', WishlistController.getAll);
router.get('/:id', WishlistController.getById);
// router.get('/user/:user_id', WishlistController.getByUser);
router.post('/', WishlistController.create);
router.delete('/:id', WishlistController.delete);

export default router;
