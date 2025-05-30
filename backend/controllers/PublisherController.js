import models from '../db/index.js';

export class PublisherController {
    static async getAll(req, res) {
        try {
            const pubs = await models.Publisher.findAll({ include: models.User });
            res.json(pubs);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch publishers' });
        }
    }

    static async getById(req, res) {
        try {
            const pub = await models.Publisher.findByPk(req.params.id, { include: models.User });
            if (!pub) return res.status(404).json({ error: 'Publisher not found' });
            res.json(pub);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch publisher' });
        }
    }

    static async create(req, res) {
        try {
            const { user_id, company_name, description, website, verified } = req.body;
            // можно добавить проверку, что user_id существует в Users

            const newPub = await models.Publisher.create({
                user_id,
                company_name,
                description,
                website,
                verified: verified || false
            });
            res.status(201).json(newPub);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create publisher' });
        }
    }

    static async update(req, res) {
        try {
            const pub = await models.Publisher.findByPk(req.params.id);
            if (!pub) return res.status(404).json({ error: 'Publisher not found' });

            const { company_name, description, website, verified } = req.body;

            await pub.update({
                company_name,
                description,
                website,
                verified
            });
            res.json(pub);
        } catch (error) {
            res.status(400).json({ error: 'Failed to update publisher' });
        }
    }

    static async delete(req, res) {
        try {
            const pub = await models.Publisher.findByPk(req.params.id);
            if (!pub) return res.status(404).json({ error: 'Publisher not found' });

            await pub.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete publisher' });
        }
    }
}
