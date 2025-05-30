import models from '../db/index.js';

export class TagController {
    static async getAllTags(req, res) {
        try {
            const tags = await models.Tag.findAll();
            res.json(tags);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch tags' });
        }
    }

    static async createTag(req, res) {
        try {
            const { name } = req.body;
            const tag = await models.Tag.create({ name });
            res.status(201).json(tag);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create tag' });
        }
    }

    static async deleteTag(req, res) {
        try {
            const tag = await models.Tag.findByPk(req.params.id);
            if (!tag) return res.status(404).json({ error: 'Tag not found' });
            await tag.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete tag' });
        }
    }
}
