import models from '../db/index.js';

export class ForumPostController {
    static async createPost(req, res) {
        try {
            const { user_id, title, content } = req.body;
            const post = await models.ForumPost.create({
                user_id,
                title,
                content,
            });
            res.json(post);
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
    
    static async deletePost(req, res) {
        try {
            const { id } = req.params;

            const post = await models.ForumPost.findByPk(id);

            if (!post) {
                return res.status(404).json({ error: 'Forum post not found' });
            }

            await post.destroy();

            res.status(204).send();

        } catch (error) {
            console.error('Error deleting forum post:', error);
            res.status(500).json({ error: 'Failed to delete forum post' });
        }
    }
}
