import models from '../db/index.js';

export class CartController {
    static async getAllCarts(req, res) {
        try {
            const carts = await models.Cart.findAll({ include: models.User });
            res.json(carts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch carts' });
        }
    }

    static async getCartById(req, res) {
        try {
            const cart = await models.Cart.findByPk(req.params.id, { include: models.User });
            if (!cart) return res.status(404).json({ error: 'Cart not found' });
            res.json(cart);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch cart' });
        }
    }

    static async createCart(req, res) {
        try {
            const cart = await models.Cart.create(req.body);
            res.status(201).json(cart);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create cart' });
        }
    }

    static async updateCart(req, res) {
        try {
            const cart = await models.Cart.findByPk(req.params.id);
            if (!cart) return res.status(404).json({ error: 'Cart not found' });
            await cart.update(req.body);
            res.json(cart);
        } catch (error) {
            res.status(400).json({ error: 'Failed to update cart' });
        }
    }

    static async deleteCart(req, res) {
        try {
            const cart = await models.Cart.findByPk(req.params.id);
            if (!cart) return res.status(404).json({ error: 'Cart not found' });
            await cart.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete cart' });
        }
    }
}