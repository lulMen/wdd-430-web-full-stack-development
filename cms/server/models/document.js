const mongoose = require('mongoose');

const childSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
});

childSchema.add({ children: [childSchema] });

const documentSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    children: [childSchema]
});

module.exports = mongoose.model('Document', documentSchema);