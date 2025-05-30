import models from '../db/index.js';

export class LibraryGameController {
    static async getAll(req, res) {
        try {
            const libraryGames = await models.LibraryGame.findAll();
            res.json(libraryGames);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch library games' });
        }
    }

    static async getByUser(req, res) {
        try {
            const { user_id } = req.params;
            const games = await models.LibraryGame.findAll({ where: { user_id } });
            res.json(games);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user library' });
        }
    }

    static async addGame(req, res) {
        try {
            const { user_id, game_id, hours_played = 0, last_played = new Date(), purchased_at = new Date() } = req.body;
            const entry = await models.LibraryGame.create({
                user_id,
                game_id,
                hours_played,
                last_played,
                purchased_at
            });
            res.status(201).json(entry);
        } catch (error) {
            res.status(400).json({ error: 'Failed to add game to library' });
        }
    }

    static async updateGame(req, res) {
        try {
            const { user_id, game_id } = req.params;
            const gameEntry = await models.LibraryGame.findOne({ where: { user_id, game_id } });
            if (!gameEntry) return res.status(404).json({ error: 'Library entry not found' });

            const { hours_played, last_played } = req.body;
            await gameEntry.update({ hours_played, last_played });
            res.json(gameEntry);
        } catch (error) {
            res.status(400).json({ error: 'Failed to update library game' });
        }
    }
}
