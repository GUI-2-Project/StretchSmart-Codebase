const mongoose = require('mongoose');

// Project Schema for mongoose connection to MongoDB database
const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed']
    },
    clientId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Client'
    }
});

module.exports = mongoose.model('Project', ProjectSchema);