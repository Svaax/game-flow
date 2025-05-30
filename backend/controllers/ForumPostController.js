import models from '../db/index.js';

export class ForumPostController {
    static async createPost(req, res) {
        try {
            const { user_id, title, content } = req.body;
            const post = await models.ForumPost.create({
                user_id,
                title,
                content,
                views: 0,
                created_at: new Date(),
                updated_at: new Date()
            });
            res.status(201).json(post);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create forum post' });
        }
    }

    static async getAllPosts(req, res) {
        try {
            const posts = await models.ForumPost.findAll();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch forum posts' });
        }
    }
}
