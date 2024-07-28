const mongoose = require('mongoose');

// GoodFor Schema for mongoose connection to MongoDB database
const GoodForSchema = new mongoose.Schema({
    goodFor: {
        type: String,
        required: [true, 'Please add an option']
    }
});

// BadFor Schema for mongoose connection to MongoDB database
const BadForSchema = new mongoose.Schema({
    badFor: {
        type: String,
        required: [true, 'Please add an option']
    }
});

// Stretch Schema for mongoose connection to MongoDB database
const StretchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    goodFor: {
        type: [GoodForSchema],
        required: [true, 'Please add at least one thing this stretch is good for']
    },
    badFor: {
        type: [BadForSchema],
        required: [true, 'Please add at least one thing this stretch is bad for']
    },
    imagePath: { //TODO: investigate storing images directly in MongoDB w/ GridFS
        type: String,
        required: [true, 'Please add an image']
    },
    instructions: {
        type: String,
        required: [true, 'Please add a instructions']
    }
});

module.exports = mongoose.model('Stretch', StretchSchema);


/**
 * Forward Head Tilt
 *      Best for: 1a-c, 2a-b, 3a-d
 *      Not good for: none
 *      Image:
 *      Step - by - Step:
 *          Sit up with your shoulders straight
 *          Tilt your chin down to your chest and hold
 *          Feel the tension in the back of your neck
 * 
 */