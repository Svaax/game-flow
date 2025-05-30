import models from '../db/index.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

function saveCoverImage(file) {
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, file.buffer);
    return `/uploads/${filename}`;
}

export class GameController {
    static async getAllGames(req, res) {
        try {
            const games = await models.Game.findAll();
            res.json(games);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch games' });
        }
    }

    static async getGameById(req, res) {
        try {
            const game = await models.Game.findByPk(req.params.id);
            if (!game) return res.status(404).json({ error: 'Game not found' });
            res.json(game);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch game' });
        }
    }

    static async createGame(req, res) {
        try {
            const {
                title,
                description,
                price,
                release_date,
                is_active,
                developer_id,
                publisher_id
            } = req.body;

            let cover_image = null;
            if (req.file) {
                cover_image = saveCoverImage(req.file);
            }

            const newGame = await models.Game.create({
                title,
                description,
                price,
                release_date,
                cover_image,
                is_active,
                developer_id,
                publisher_id
            });

            res.status(201).json(newGame);
        } catch (error) {
            res.status(400).json({ error: 'Failed to create game' });
        }
    }

    static async updateGame(req, res) {
        try {
            const game = await models.Game.findByPk(req.params.id);
            if (!game) return res.status(404).json({ error: 'Game not found' });

            const {
                title,
                description,
                price,
                release_date,
                is_active,
                developer_id,
                publisher_id
            } = req.body;

            let cover_image = game.cover_image;
            if (req.file) {
                cover_image = saveCoverImage(req.file);
            }

            await game.update({
                title,
                description,
                price,
                release_date,
                cover_image,
                is_active,
                developer_id,
                publisher_id
            });

            res.json(game);
        } catch (error) {
            res.status(400).json({ error: 'Failed to update game' });
        }
    }

    static async deleteGame(req, res) {
        try {
            const game = await models.Game.findByPk(req.params.id);
            if (!game) return res.status(404).json({ error: 'Game not found' });

            await game.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete game' });
        }
    }
}
