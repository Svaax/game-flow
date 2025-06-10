import { Router } from 'express';
import { WishlistController } from '../../controllers/WishlistController.js';
import models from '../../db/index.js';
const router = Router();

router.get('/', WishlistController.getAll);
// router.get('/:id', WishlistController.getById);
router.post('/', WishlistController.create);
router.delete('/:id', WishlistController.delete);

router.get('/:id', async (req, res) => {
    const games = await models.WishlistGame.findAll({
        where: { wishlistId: req.params.wishlistId },
        include: models.Game
    });
    res.json(games);
});

export default router;
