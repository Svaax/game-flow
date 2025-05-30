import models from '../db/index.js';

export class GroupCommentController {
    static async create(req, res) {
        try {
            const { guide_id, post_id, user_id, content } = req.body;
            const comment = await models.GroupComment.create({
                guide_id,
                post_id,
                user_id,
                content,
                created_at: new Date()
            });
            res.status(201).json(comment);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create group comment' });
        }
    }

    static async getByPost(req, res) {
        try {
            const { post_id } = req.params;
            const comments = await models.GroupComment.findAll({ where: { post_id } });
            res.json(comments);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch group comments' });
        }
    }
}
