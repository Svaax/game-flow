// UserRouter.js
import express from 'express';
import { UserController } from '../../controllers/UserController.js';

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/create', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;

