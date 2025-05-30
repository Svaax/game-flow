import models from '../db/index.js';

export class GroupController {
    static async create(req, res) {
        try {
            const { name, description, created_by, icon } = req.body;
            const group = await models.Group.create({
                name,
                description,
                created_by,
                icon,
                created_at: new Date()
            });
            res.status(201).json(group);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create group' });
        }
    }

    static async getAll(req, res) {
        try {
            const groups = await models.Group.findAll();
            res.json(groups);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch groups' });
        }
    }
}
