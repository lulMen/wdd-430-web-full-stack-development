const express = require('express');
const router = express.Router();

const controller = require('../controllers/workouts.controller');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.delete('/:id', controller.remove);

module.exports = router;