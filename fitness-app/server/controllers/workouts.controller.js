const Workout = require('../models/workout.model');

exports.getAll = async (req, res) => {
    try {
        const workouts = await Workout.find().exec();
        res.json(workouts);
    } catch (error) {
        console.error('Error fetching workouts: ', error);
        res.status(500)
            .json({ message: error.message });
    }
}

exports.getById = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id).exec();
        if (!Workout) {
            return res.status(404)
                .json({ message: 'Workout not found' });
        }
        res.json(workout);
    } catch (error) {
        console.error(`Error fetching workout ${req.params.id}: `, error);
        res.status(500)
            .json({ message: error.message });
    }
}

exports.create = async (req, res) => {
    try {
        const created = await Workout.create(req.body);
        res.status(201).json(created);
    } catch (error) {
        console.error('Error creating workout: ', error);
        res.status(400)
            .json({ message: error.message });
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Workout.findByIdAndDelete(req.parmas.id).exec();
        if (!deleted) {
            return res.status(404)
                .json({ message: 'Workout not found' });
        }
        res.status(204);
    } catch (error) {
        console.error(`Error deleting workout ${req.params.id}: `, error);
        res.status(500)
            .json({ message: error.message });
    }
}