const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSchema = new Schema({
    name: { type: String, required: true },
    muscleGroup: { type: String, required: true }
});

module.exports = mongoose.model('Exercise', exerciseSchema);