import express from 'express';
import { CartController } from '../../controllers/CartController.js';
import models from '../../db/index.js';
const router = express.Router();

router.get('/', CartController.getAllCarts);
router.get('/:id', CartController.getCartById);
router.post('/', CartController.createCart);
router.put('/:id', CartController.updateCart);
router.delete('/:id', CartController.deleteCart);

// GET /carts?userId=:userId
router.get('/', async (req, res) => {
    const { userId } = req.query;
    const cart = await models.Cart.findOne({ where: { userId } });
    res.json(cart);
});

export default router;
