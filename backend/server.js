import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import  models from './db/index.js';
import router from './routes/index.js';


import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // allows to parse json from req/res
app.use(cors())
app.use(helmet()); // middleware serving security purposes, by adding tags to http headers
app.use(morgan('dev')) // req logs

app.use('/api', router)

// connecting to db
async function initializeDatabase() {
    try {
        // await models.sequelize.authenticate();
        console.log('Connection established');

        await models.sequelize.sync({ alter: true }); // Safer than force: true
        console.log('Models synchronized');

        const tableCount = await models.sequelize.query(
            "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'"
        );
        console.log(`Found ${tableCount[0][0].count} tables`);
    } catch (error) {
        console.error('Database initialization failed:', error);
    }
}

initializeDatabase();


app.listen(PORT, () => {console.log(`App is running on port ${PORT}`)})
