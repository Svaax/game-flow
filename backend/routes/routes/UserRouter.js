// UserRouter.js
import express from 'express';
const UserRouter = express.Router();
import UserController from '../../controllers/UserController.js';

UserRouter.get('/all', UserController.getAll);

UserRouter.post('/signup', UserController.signup);
UserRouter.post('/login', UserController.login);
UserRouter.post('/create', UserController.create);

UserRouter.put('/:id', UserController.update);
UserRouter.delete('/delete/:id', UserController.delete);

export default UserRouter;

