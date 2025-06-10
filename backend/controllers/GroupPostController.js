import models from '../db/index.js';

export class GroupPostController {
    static async getAllPostsByGroup(req, res) {
        try {
            const { groupId } = req.params;
            const posts = await models.GroupPost.findAll({
                where: { group_id: groupId },
                include: [
                    {
                        model: models.User,
                        as: 'author',
                        attributes: ['id', 'username', 'avatar']
                    }
                ],
                order: [['created_at', 'DESC']]
            });
            res.json(posts);
        } catch (error) {
            console.error('Error fetching group posts:', error);
            res.status(500).json({ error: 'Failed to fetch group posts' });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const post = await models.GroupPost.findByPk(id, {
                include: [
                    {
                        model: models.User,
                        as: 'author',
                        attributes: ['id', 'username', 'avatar']
                    },
                    {
                        model: models.Group,
                        as: 'group',
                        attributes: ['id', 'name']
                    }
                ]
            });

            if (!post) {
                return res.status(404).json({ error: 'Group post not found' });
            }

            res.json(post);
        } catch (error) {
            console.error('Error fetching group post:', error);
            res.status(500).json({ error: 'Failed to fetch group post' });
        }
    }

    static async createPost(req, res) {
        try {
            const { groupId } = req.params; // group_id теперь из URL
            const { user_id, title, content } = req.body;

            const post = await models.GroupPost.create({
                group_id: groupId,
                user_id,
                title,
                content,
            });
            res.status(201).json(post);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create group post' });
        }
    }

    static async updatePost(req, res) {
        try {
            const { id } = req.params;
            const { title, content } = req.body;

            const post = await models.GroupPost.findByPk(id);

            if (!post) {
                return res.status(404).json({ error: 'Group post not found' });
            }

            await post.update({
                title: title || post.title,
                content: content || post.content,
                updated_at: new Date()
            });

            res.json(post);
        } catch (error) {
            console.error('Error updating group post:', error);
            res.status(400).json({ error: 'Failed to update group post' });
        }
    }

    static async deletePost(req, res) {
        try {
            const { id } = req.params;

            const post = await models.GroupPost.findByPk(id);

            if (!post) {
                return res.status(404).json({ error: 'Group post not found' });
            }



            await post.destroy();

            res.status(204).send();
        } catch (error) {
            console.error('Error deleting group post:', error);
            res.status(500).json({ error: 'Failed to delete group post' });
        }
    }
}
