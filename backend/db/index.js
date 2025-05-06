import {Sequelize} from 'sequelize';

// Database initialization
const sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
)

// Collect all models into one Object
const models = {
    User: require('./models/User')(sequelize, Sequelize.DataTypes),
    Game: require('./models/Game')(sequelize, Sequelize.DataTypes),
    Developer: require('./models/Developer')(sequelize, Sequelize.DataTypes),
    Publisher: require('./models/Publisher')(sequelize, Sequelize.DataTypes),

    // SupportAgent: require('./models/SupportAgent')(sequelize, Sequelize.DataTypes),
    // SupportTicket: require('./models/SupportTicket')(sequelize, Sequelize.DataTypes),
    // UserGame: require('./models/UserGame')(sequelize, Sequelize.DataTypes),
    // UserFriend: require('./models/UserFriend')(sequelize, Sequelize.DataTypes)
};

// Set up associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models; // later will be used in CONTROLLERS


// Протестить подключение базы данных и создание таблиц.