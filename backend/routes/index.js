import express from 'express';
const router = new express();

import CartGameRouter from './routes/CartGameRouter.js';
import CartRouter from './routes/CartRouter.js';
import DeveloperRouter from './routes/DeveloperRouter.js';
import ForumCommentRouter from './routes/ForumCommentRouter.js';
import ForumPostRouter from './routes/ForumPostRouter.js';
import GameAchievementRouter from './routes/GameAchievementRouter.js';
import GameRouter from './routes/GameRouter.js';
import GameTagRouter from './routes/GameTagRouter.js';
import GroupCommentRouter from './routes/GroupCommentRouter.js';
import GroupMemberRouter from './routes/GroupMemberRouter.js';
import GroupPostRouter from './routes/GroupPostRouter.js';
import GroupRouter from './routes/GroupRouter.js';
import GuideCommentRouter from './routes/GuideCommentRouter.js';
import GuideRouter from './routes/GuideRouter.js';
import LibraryGameRouter from './routes/LibraryGameRouter.js';
import PublisherRouter from './routes/PublisherRouter.js';
import ReviewRouter from './routes/ReviewRouter.js';
import TagRouter from './routes/TagRouter.js';
import UserAchievementRouter from './routes/UserAchievementRouter.js';
import UserRouter from './routes/UserRouter.js';
import WishlistGameRouter from './routes/WishlistGameRouter.js';
import WishlistRouter from './routes/WishlistRouter.js';

router.use('/users', UserRouter);
// router.use('/users/:userId/library', LibraryGameRouter);
// router.use('/users/:userId/achievements', UserAchievementRouter);
router.use('/users/:userId/wishlist', WishlistGameRouter);
router.use('/users/:userId/cart', CartGameRouter);


router.use('/games', GameRouter);
router.use('/games/:gameId/reviews', ReviewRouter);
// router.use('/games/:gameId/achievements', GameAchievementRouter);

router.use('/cart', CartRouter);
router.use('/wishlist', WishlistRouter);

router.use('/groups', GroupRouter);
router.use('/groups/:groupId/posts', GroupPostRouter);
// router.use('/groups/:groupId/members', GroupMemberRouter);
// router.use('/groups/:groupId/comments', GroupCommentRouter);

router.use('/forum', ForumPostRouter);
// router.use('/forum/:postId/comments', ForumCommentRouter);

router.use('/guides', GuideRouter);
// router.use('/guides/:guideId/comments', GuideCommentRouter);

router.use('/developers', DeveloperRouter);
router.use('/publishers', PublisherRouter);
// router.use('/tags', TagRouter);
// router.use('/game-tags', GameTagRouter);


export default router;