import models from '../db/index.js';

export class GameAchievementController {
    static async getAll(req, res) {
        try {
            const achievements = await models.GameAchievements.findAll();
            res.json(achievements);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch game achievements' });
        }
    }

    static async getByGame(req, res) {
        try {
            const { game_id } = req.params;
            const achievements = await models.GameAchievements.findAll({ where: { game_id } });
            res.json(achievements);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch achievements for game' });
        }
    }

    static async create(req, res) {
        try {
            const {
                game_id,
                name,
                description,
                icon,
                is_secret = false,
                completion_percentage = 0
            } = req.body;

            const achievement = await models.GameAchievements.create({
                game_id,
                name,
                description,
                icon,
                is_secret,
                completion_percentage
            });

            res.status(201).json(achievement);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create game achievement' });
        }
    }
}
