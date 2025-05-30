import models from '../db/index.js';

export class ReviewController {
    static async getAll(req, res) {
        try {
            const reviews = await models.Review.findAll({ include: [models.User, models.Game] });
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch reviews' });
        }
    }

    static async getById(req, res) {
        try {
            const review = await models.Review.findByPk(req.params.id, {
                include: [models.User, models.Game]
            });
            if (!review) return res.status(404).json({ error: 'Review not found' });
            res.json(review);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch review' });
        }
    }

    static async create(req, res) {
        try {
            const { user_id, game_id, rating, comment } = req.body;
            const review = await models.Review.create({
                user_id,
                game_id,
                rating,
                comment,
                created_at: new Date(),
                updated_at: new Date()
            });
            res.status(201).json(review);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create review' });
        }
    }

    static async update(req, res) {
        try {
            const review = await models.Review.findByPk(req.params.id);
            if (!review) return res.status(404).json({ error: 'Review not found' });

            const { rating, comment } = req.body;
            await review.update({
                rating,
                comment,
                updated_at: new Date()
            });

            res.json(review);
        } catch (error) {
            res.status(400).json({ error: 'Failed to update review' });
        }
    }

    static async delete(req, res) {
        try {
            const review = await models.Review.findByPk(req.params.id);
            if (!review) return res.status(404).json({ error: 'Review not found' });

            await review.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete review' });
        }
    }
}
