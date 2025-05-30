import models from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ApiError from "../errors/ApiError.js";
import { Op } from 'sequelize';

function generateToken(id, username, password, role) {
    const token = jwt.sign({id, username, password, role}, process.env.JWT_KEY, {expiresIn: '24h'});
    return token;
}

const ROLES = ['USER', 'ADMIN', 'DEVELOPER', 'PUBLISHER'];


export class UserController {

    // signup and login functions (by default assign role 'USER')
    // are available to user via ./login and ./signup,
    // others only to admin

    static async signup(req, res, next) {
        const {username, password, email, role = 'USER'} = req.body;
        try {
            if (!email || !password || !username) {
                throw new Error('Fields should be filled');
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const userData = {username, password:hashedPassword, email, role}
            const user = await models.User.create(userData);

            const token  = generateToken(user.user_id, user.username, user.password, user.role);
            return res.json({token})
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    static async login(req, res, next) {
        const { email, username, password } = req.body;

        try {
            if (!(email || username)) { throw new Error('Email or username is required'); }
            if (!password) { throw new Error('Password is required'); }

            const user = await models.User.findOne({
                where: {
                    [Op.or]: [
                        ...(email ? [{ email }] : []),
                        ...(username ? [{ username }] : [])
                    ]
                }
            });

            if (!user) { throw new Error('User not found'); }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) { throw new Error('Incorrect password'); }

            // 4. Prepare response
            const userData = {
                id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role
            };

            // 5. Generate token
            const token = generateToken(userData);

            return res.json({ token });

        } catch (error) {
            // 6. Proper error handling
            next(new ApiError(400, error.message)); // Fixed ApiError usage
        }
    }

    // available to admin, allow to create/update/delete devs, publishers and admins accounts
    static async create(req, res, next) {
        const {username, email, password, role = 'USER'} = req.body
        try {
            if (!email || !password) {
                throw new Error('Fields should be filled');
            }
            if ( !( ROLES.includes(role) ) ) {
                throw new Error('Cannot assign role that not exists')
            }
            const hashed_password = await bcrypt.hash(password, 10)
            const user = await models.User.create({username, email, password: hashed_password, role})
            return res.json(user)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const updates = req.body;

            // Validate ID is a number
            if (!id || isNaN(parseInt(id))) {
                throw new Error('Invalid user ID');
            }

            if (Object.keys(updates).length === 0) {
                throw new Error('No data to update');
            }

            const user = await models.User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            if (updates.password) {
                updates.password = await bcrypt.hash(updates.password, 10);
            }

            if (updates.role) {
                if (!ROLES.includes(updates.role)) {
                    throw new Error(`Invalid role. Valid roles: ${ROLES.join(', ')}`);
                }
            }

            await user.update(updates);
            return res.json(user);

        } catch (error) {
            next( ApiError.badRequest(400, error.message));
        }
    }

    static async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('User id is not specified')
            }
            const user = await models.User.findByPk(req.params.id);
            await user.destroy();
            return res.json({message: 'User removed successfully'});

        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    static async getAll(req, res, next) {
        const users = await models.User.findAll();
        return res.json(users)
    }
}