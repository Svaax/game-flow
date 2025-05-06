import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import models from './db/index.js';

import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // allows to parse json from req/res
app.use(cors())
app.use(helmet()); // middleware serving security purposes, by adding tags to http headers
app.use(morgan('dev')) // req logs


// connecting to db
try {
    await sequelize.authenticate();
    console.log("Grats, ", process.env.DB_NAME);
} catch (error) {
    console.error('Balls:', error);
}



app.listen(PORT, () => {console.log(`App is running on port ${PORT}`)})

// написать API.