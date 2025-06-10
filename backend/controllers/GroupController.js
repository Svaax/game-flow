import models from '../db/index.js';

export class GroupController {
    static async createGroup(req, res) {
        try {
            const { name, description, created_by, icon = ''} = req.body;
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

    static async getAllGroups(req, res) {
        try {
            const groups = await models.Group.findAll();
            res.json(groups);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch groups' });
        }
    }
    static async getGroupById(req, res) {
        try {
            const group = await models.Group.findByPk(req.params.id);
            res.json(group);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch groups' });
        }
    }
}
