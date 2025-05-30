import models from '../db/index.js';

export class GroupPostController {
    static async create(req, res) {
        try {
            const { group_id, user_id, title, content } = req.body;
            const post = await models.GroupPost.create({
                group_id,
                user_id,
                title,
                content,
                created_at: new Date(),
                updated_at: new Date()
            });
            res.status(201).json(post);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create group post' });
        }
    }

    static async getAll(req, res) {
        try {
            const posts = await models.GroupPost.findAll();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch posts' });
        }
    }
}
