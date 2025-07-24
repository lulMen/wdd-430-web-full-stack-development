const mongoose = require('mongoose');
const { Schema } = mongoose;

const workoutExerciseSchema = new Schema({
    exerciseId: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true
    },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    duration: { type: Number, required: true }
});

const workoutSchema = new Schema({
    date: { type: String, required: true },
    exercises: [workoutExerciseSchema]
});

module.exports = mongoose.model('Workout', workoutSchema);