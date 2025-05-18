import express from 'express';
const router = new express(); //contains all the routes
// import routers
import UserRouter from './routes/UserRouter.js';
// import GameRouter from './routes/GameRouter.js';
// import DeveloperRouter from './routes/DeveloperRouter.js';
// import PublisherRouter from './routes/PublisherRouter.js';

router.use('/users', UserRouter);
// router.use('./game', GameRouter);
// router.use('./developer', DeveloperRouter);
// router.use('./publisher', PublisherRouter);

export default router;