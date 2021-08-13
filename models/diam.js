const mongoose = require('mongoose');

const DiamSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
    isActive: ['active', 'inactive'],
    location: String
});

const Diam = mongoose.model('Diam', DiamSchema);

module.exports = Diam;