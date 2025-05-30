import models from '../db/index.js';

export class UserAchievementsController {
    static async getAll(req, res) {
        try {
            const achievements = await models.UserAchievements.findAll();
            res.json(achievements);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user achievements' });
        }
    }

    static async getByUser(req, res) {
        try {
            const { user_id } = req.params;
            const userAchievements = await models.UserAchievements.findAll({ where: { user_id } });
            res.json(userAchievements);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user achievements' });
        }
    }

    static async create(req, res) {
        try {
            const { user_id, achievement_id } = req.body;
            const achievement = await models.UserAchievements.create({
                user_id,
                achievement_id,
                unlocked_at: new Date()
            });
            res.status(201).json(achievement);
        } catch (error) {
            res.status(400).json({ error: 'Failed to unlock achievement' });
        }
    }
}
