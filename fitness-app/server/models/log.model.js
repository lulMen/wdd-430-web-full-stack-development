const mongoose = require('mongoose');
const { Schema } = mongoose;

const logExerciseSchema = new Schema({
    exerciseId: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true
    },
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    duration: { type: Number, required: true },
});

const logSchema = new Schema({
    date: { type: Date, required: true },
    exercises: [logExerciseSchema]
});

module.exports = mongoose.model('Log', logSchema);