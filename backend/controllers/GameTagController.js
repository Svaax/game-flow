import models from '../db/index.js';

export class GameTagController {
    static async addTagToGame(req, res) {
        try {
            const { game_id, tag_id } = req.body;
            const entry = await models.GameTag.create({ game_id, tag_id });
            res.status(201).json(entry);
        } catch (error) {
            res.status(400).json({ error: 'Failed to add tag to game' });
        }
    }

    static async removeTagFromGame(req, res) {
        try {
            const { game_id, tag_id } = req.params;
            const entry = await models.GameTag.findOne({ where: { game_id, tag_id } });
            if (!entry) return res.status(404).json({ error: 'Tag not found for game' });
            await entry.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to remove tag from game' });
        }
    }

    static async getTagsByGame(req, res) {
        try {
            const { game_id } = req.params;
            const tags = await models.GameTag.findAll({
                where: { game_id },
                include: models.Tag
            });
            res.json(tags);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch tags for game' });
        }
    }
}
