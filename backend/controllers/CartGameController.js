import models from '../db/index.js';

export class CartGameController {
    static async getAllCartGames(req, res) {
        try {
            const cartGames = await models.CartGame.findAll({ include: [models.Cart, models.Game] });
            res.json(cartGames);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch cart games' });
        }
    }

    static async getCartGameById(req, res) {
        try {
            const cartGame = await models.CartGame.findByPk(req.params.id, { include: [models.Cart, models.Game] });
            if (!cartGame) return res.status(404).json({ error: 'CartGame not found' });
            res.json(cartGame);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch cart game' });
        }
    }

    static async addGameToCart(req, res) {
        try {
            const { cartId, gameId } = req.body;
            const cartGame = await models.CartGame.create({ cartId, gameId });
            res.status(201).json(cartGame);
        } catch (error) {
            res.status(400).json({ error: 'Failed to add game to cart' });
        }
    }

    static async updateCartGame(req, res) {
        try {
            const cartGame = await models.CartGame.findByPk(req.params.id);
            if (!cartGame) return res.status(404).json({ error: 'CartGame not found' });
            await cartGame.update(req.body);
            res.json(cartGame);
        } catch (error) {
            res.status(400).json({ error: 'Failed to update cart game' });
        }
    }

    static async removeGameFromCart(req, res) {
        try {
            const cartGame = await models.CartGame.findByPk(req.params.id);
            if (!cartGame) return res.status(404).json({ error: 'CartGame not found' });
            await cartGame.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to remove game from cart' });
        }
    }
}