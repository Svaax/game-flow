import models from '../db/index.js';

export class DeveloperController {
    static async getAll(req, res) {
        try {
            const devs = await models.Developer.findAll({ include: models.User });
            res.json(devs);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch developers' });
        }
    }
    static async getById(req, res) {
        try {
            const dev = await models.Developer.findByPk(req.params.id, { include: models.User });
            if (!dev) return res.status(404).json({ error: 'Developer not found' });
            res.json(dev);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch developer' });
        }
    }

    static async create(req, res) {
        try {
            const {user_id, company_name, description, website } = req.body;

            const newDev = await models.Developer.create({
                user_id,
                company_name,
                description,
                website,
                verified: false
            });
            res.status(201).json(newDev);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create developer' });
        }
    }

    static async update(req, res) {
        try {
            const dev = await models.Developer.findByPk(req.params.id);
            if (!dev) return res.status(404).json({ error: 'Developer not found' });

            const { company_name, description, website, verified } = req.body;

            await dev.update({
                company_name,
                description,
                website,
                verified
            });
            res.json(dev);
        } catch (error) {
            res.status(400).json({ error: 'Failed to update developer' });
        }
    }

    static async delete(req, res) {
        try {
            const dev = await models.Developer.findByPk(req.params.id);
            if (!dev) return res.status(404).json({ error: 'Developer not found' });

            await dev.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete developer' });
        }
    }
}