import models from '../db/index.js';

export class WishlistController {
    static async getAll(req, res) {
        try {
            const wishlists = await models.Wishlist.findAll({ include: models.User });
            res.json(wishlists);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch wishlists' });
        }
    }

    static async getById(req, res) {
        try {
            const wishlist = await models.Wishlist.findByPk(req.params.id, {
                include: [models.User, models.Game],
            });
            if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });
            res.json(wishlist);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch wishlist' });
        }
    }

    static async create(req, res) {
        try {
            const { user_id } = req.body;
            const wishlist = await models.Wishlist.create({ user_id });
            res.status(201).json(wishlist);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create wishlist' });
        }
    }

    static async delete(req, res) {
        try {
            const wishlist = await models.Wishlist.findByPk(req.params.id);
            if (!wishlist) return res.status(404).json({ error: 'Wishlist not found' });
            await wishlist.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete wishlist' });
        }
    }
}
