const Exercise = require('../models/exercise.model');

exports.getAll = async (req, res) => {
    try {
        const exercises = await Exercise.find().exec();
        res.json(exercises);
    } catch (error) {
        console.error('Error fetching exercises: ', error);
        res.status(500)
            .json({ message: error.message });
    }
}

exports.getById = async (req, res) => {
    try {
        const exercise = await Exercise.findById(req.params.id.trim()).exec();
        if (!exercise) {
            return res.status(404)
                .json({ message: 'Exercise not found' });
        }
        res.json(exercise);
    } catch (error) {
        console.error(`Error fetching exercise ${req.params.id}: `, error);
        res.status(500)
            .json({ message: error.message });
    }
}

exports.create = async (req, res) => {
    try {
        const created = await Exercise.create(req.body);
        res.status(201).json(created);
    } catch (error) {
        console.error('Error creating exercise: ', error);
        res.status(400)
            .json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const updated = await Exercise.findByIdAndUpdate(req.params.id.trim(), req.body, { new: true }).exec();
        if (!updated) {
            return res.status(404)
                .json({ message: 'Exercise not found' })
        }
        res.status(204)
            .json(updated);
    } catch (error) {
        res.status(400)
            .json({ message: error.message });
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Exercise.findByIdAndDelete(req.params.id.trim()).exec();
        if (!deleted) {
            return res.status(404)
                .json({ message: 'Exercise not found' })
        }
        res.sendStatus(204);
    } catch (error) {
        console.error(`Error deleting exercise ${req.params.id}: `, error);
        res.status(500)
            .json({ message: error.message });
    }
}