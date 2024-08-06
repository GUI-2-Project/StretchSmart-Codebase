import mongoose from 'mongoose';

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
    goodFor: [  // NOTE: This is an array of strings
        { 
        type: String,
        }
    ],
    badFor: [   // NOTE: This is an array of strings
        {
        type: String,
        }
    ],
    imageURL: {
        type: String,
        required: [true, 'Please add an image']
    },
    instructions: {
        type: String,
        required: [true, 'Please add a instructions']
    }
});

export default mongoose.model('Stretch', StretchSchema);


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