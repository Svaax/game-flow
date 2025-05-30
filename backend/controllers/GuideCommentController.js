import models from '../db/index.js';

export class GuideCommentController {
    static async create(req, res) {
        try {
            const { guide_id, user_id, content } = req.body;
            const comment = await models.GuideComment.create({
                guide_id,
                user_id,
                content,
                created_at: new Date()
            });
            res.status(201).json(comment);
        } catch (error) {
            res.status(400).json({ error: 'Failed to add comment to guide' });
        }
    }

    static async getByGuide(req, res) {
        try {
            const { guide_id } = req.params;
            const comments = await models.GuideComment.findAll({ where: { guide_id } });
            res.json(comments);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch guide comments' });
        }
    }
}
