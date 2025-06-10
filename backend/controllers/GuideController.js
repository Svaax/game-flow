import models from '../db/index.js';

export class GuideController {
    static async getAllGuides(req, res) {
        try {
            const guides = await models.Guide.findAll();
            res.json(guides);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch guides' });
        }
    }

    static async getById(req, res) {
        try {
            const guide = await models.Guide.findByPk(req.params.id);
            if (!guide) return res.status(404).json({ error: 'Guide not found' });
            res.json(guide);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch guide' });
        }
    }

    static async createGuide(req, res) {
        try {
            const { user_id, game_id, title, content } = req.body;
            const guide = await models.Guide.create({
                user_id,
                game_id,
                title,
                content,
                views: 0,
                created_at: new Date(),
                updated_at: new Date()
            });
            res.status(201).json(guide);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create guide' });
        }
    }

    static async updateGuide(req, res) {
        try {
            const guide = await models.Guide.findByPk(req.params.id);
            if (!guide) return res.status(404).json({ error: 'Guide not found' });

            const { title, content } = req.body;
            await guide.update({ title, content, updated_at: new Date() });

            res.json(guide);
        } catch (error) {
            res.status(400).json({ error: 'Failed to update guide' });
        }
    }

    static async deleteGuide(req, res) {
        try {
            const guide = await models.Guide.findByPk(req.params.id);
            if (!guide) return res.status(404).json({ error: 'Guide not found' });
            await guide.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete guide' });
        }
    }
}
