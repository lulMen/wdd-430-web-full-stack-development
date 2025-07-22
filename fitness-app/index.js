require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const exercisesRouter = require('./server/routes/exercises.routes');
const workoutsRouter = require('./server/routes/workouts.routes');
const logsRouter = require('./server/routes/logs.routes');

const app = express();
app.use(cors(), express.json());

// Routes
app.use('/api/exercises', exercisesRouter);
app.use('/api/workouts', workoutsRouter);
app.use('/api/logs', logsRouter);

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB!');

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
