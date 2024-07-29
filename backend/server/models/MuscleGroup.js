const mongoose = require('mongoose');

// MuscleGroup Schema for mongoose connection to MongoDB database
const MuscleGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    imageURL: {
        type: String,
        required: [true, 'Please add an image']
    }
});

module.exports = mongoose.model('MuscleGroup', MuscleGroupSchema);


/**
 * Neck
 *  <image>
 * 
 */