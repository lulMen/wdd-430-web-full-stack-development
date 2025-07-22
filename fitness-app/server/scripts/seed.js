require('dotenv').config();
const mongoose = require('mongoose');

const Exercise = require('../models/exercise.model');
const Workout = require('../models/workout.model');
const Log = require('../models/log.model');

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear all existing
    await Promise.all([
        Exercise.deleteMany({}),
        Workout.deleteMany({}),
        Log.deleteMany({})
    ]);

    const exercises = await Exercise.insertMany([
        { name: 'Push-Up', muscleGroup: 'Chest' },
        { name: 'Squat', muscleGroup: 'Legs' },
        { name: 'Plank', muscleGroup: 'Core' },
    ]);

    const workoutsData = [
        {
            date: new Date('2025-07-20'),
            exercises: [
                { exerciseId: exercises[0]._id, sets: 3, reps: 12, duration: 0 },
                { exerciseId: exercises[2]._id, sets: 2, reps: 1, duration: 60 },
            ]
        },
        {
            date: new Date('2025-07-19'),
            exercises: [
                { exerciseId: exercises[1]._id, sets: 4, reps: 10, duration: 0 },
            ]
        },
        {
            date: new Date('2025-07-18'),
            exercises: [
                { exerciseId: exercises[0]._id, sets: 2, reps: 15, duration: 0 },
                { exerciseId: exercises[1]._id, sets: 3, reps: 8, duration: 0 },
            ]
        },
    ];
    await Workout.insertMany(workoutsData);

    const logsData = workoutsData.map(workout => ({
        date: workout.date,
        exercises: workout.exercises.map(exercise => {
            const resultData = exercises.find(
                entry => entry._id.toString() === exercise.exerciseId.toString()
            );
            if (!resultData) {
                throw new Error(`Cannot find exercise for id ${exercise.exerciseId}`);
            }
            return {
                exerciseId: exercise.exerciseId,
                name: resultData.name,
                sets: exercise.sets,
                reps: exercise.reps,
                duration: exercise.duration
            }
        })
    }));
    await Log.insertMany(logsData);

    console.log('Database seeded!');
    process.exit(0);
}

seed().catch(error => {
    console.error(error);
    process.exit(1);
});