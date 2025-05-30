import models from '../db/index.js';

export class WishlistGameController {
    static async addGame(req, res) {
        try {
            const { wishlist_id, game_id } = req.body;
            const entry = await models.WishlistGame.create({
                wishlist_id,
                game_id,
                added_at: new Date()
            });
            res.status(201).json(entry);
        } catch (error) {
            res.status(400).json({ error: 'Failed to add game to wishlist' });
        }
    }

    static async removeGame(req, res) {
        try {
            const { wishlist_id, game_id } = req.params;
            const entry = await models.WishlistGame.findOne({ where: { wishlist_id, game_id } });
            if (!entry) return res.status(404).json({ error: 'Game not found in wishlist' });
            await entry.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to remove game from wishlist' });
        }
    }

    static async getWishlistGames(req, res) {
        try {
            const { wishlist_id } = req.params;
            const games = await models.WishlistGame.findAll({
                where: { wishlist_id },
                include: models.Game
            });
            res.json(games);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch wishlist games' });
        }
    }
}
