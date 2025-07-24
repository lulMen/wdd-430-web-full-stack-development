const Log = require("../models/log.model");

exports.getAll = async (req, res) => {
    try {
        const logs = await Log.find().exec();
        res.json(logs);
    } catch (error) {
        console.error('Error fetching logs: ', error);
        res.status(500)
            .json({ message: error.message });
    }
}

exports.getById = async (req, res) => {
    try {
        const log = await Log.findById(req.params.id).exec();
        if (!log) {
            return res.status(404)
                .json({ message: 'Log not found' });
        }
        res.json(log);
    } catch (error) {
        console.error(`Error fetching log ${req.params.id}: `, error);
        res.status(500)
            .json({ message: error.message });

    }
}

exports.create = async (req, res) => {
    try {
        const created = await Log.create(req.body);
        res.status(201)
            .json(created);
    } catch (error) {
        console.error('Error creating log: ', error);
        res.status(400)
            .json({ message: error.message });
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Log.findByIdAndDelete(req.params.id).exec();
        if (!deleted) {
            return res.status(404)
                .json({ message: 'Log not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        console.error(`Error deleting log ${req.params.id}: `, error)
        res.status(500)
            .json({ message: error.message });
    }
}