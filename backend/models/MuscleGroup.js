const mongoose = require('mongoose');
const Stretch = require("../models/Stretch");

// MuscleGroup Schema for mongoose connection to MongoDB database
const MuscleGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    imageURL: {
        type: String,
        required: [true, 'Please add an image']
    },
    stretches: [    // Note: this is an array of stretch _ids
        {
        type: String,
        required: [true, 'Please add at least one stretch _id']
        }
    ]
});

module.exports = mongoose.model('MuscleGroup', MuscleGroupSchema);


/**
 * Neck
 *  <image>
 * 
 */