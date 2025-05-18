import {DataTypes, Sequelize} from 'sequelize';

import dotenv from 'dotenv';

import Cart from './models/Cart.js';
import CartGame from './models/CartGame.js';
import Developer from './models/Developer.js';
import ForumComment from './models/ForumComment.js';
import ForumPost from './models/ForumPost.js';
import Game from './models/Game.js';
import GameAchievements from './models/GameAchievements.js';
import GameTag from './models/GameTag.js';
import Group from './models/Group.js';
import GroupComment from './models/GroupComment.js'
import GroupMember from './models/GroupMember.js';
import GroupPost from './models/GroupPost.js';
import Guide from './models/Guide.js';
import GuideComment from './models/GuideComment.js';
import LibraryGame from './models/LibraryGame.js';
import Publisher from './models/Publisher.js';
import Review from './models/Review.js';
import Tag from './models/Tag.js';
import User from './models/User.js';
import UserAchievements from './models/UserAchievements.js';
import Wishlist from './models/Wishlist.js';
import WishlistGame from './models/WishlistGame.js';




dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: (msg) => {
            if (msg.includes('Executing') && !msg.includes('SELECT table_name'))
                {console.log(msg);}
        },
        define: {
            timestamps: false, // Adds createdAt and updatedAt fields
            underscored: true, // Converts camelCase to snake_case
        }
    }
)

// Collect all models into one Object
const models = {
    Cart: Cart(sequelize, DataTypes),
    CartGame: CartGame(sequelize, DataTypes),
    Developer: Developer(sequelize, DataTypes),
    ForumComment: ForumComment(sequelize, DataTypes),
    ForumPost: ForumPost(sequelize, DataTypes),
    Game: Game(sequelize, DataTypes),
    GameAchievements: GameAchievements(sequelize, DataTypes),
    GameTag: GameTag(sequelize, DataTypes),
    Group: Group(sequelize, DataTypes),
    GroupComment: GroupComment(sequelize, DataTypes),
    GroupMember: GroupMember(sequelize, DataTypes),
    GroupPost: GroupPost(sequelize, DataTypes),
    Guide: Guide(sequelize, DataTypes),
    GuideComment: GuideComment(sequelize, DataTypes),
    LibraryGame: LibraryGame(sequelize, DataTypes),
    Publisher: Publisher(sequelize, DataTypes),
    Review: Review(sequelize, DataTypes),
    Tag: Tag(sequelize, DataTypes),
    User: User(sequelize, DataTypes),
    UserAchievements: UserAchievements(sequelize, DataTypes),
    Wishlist: Wishlist(sequelize, DataTypes),
    WishlistGame: WishlistGame(sequelize, DataTypes),
};

// Set up associations

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models
