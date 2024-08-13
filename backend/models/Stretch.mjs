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
    durationSeconds: {
        type: Number,
        required: [true, 'Please add a duration in seconds']  
    },
    reps: {
        type: Number,
        required: [true, 'Please add a number of repetitions']
    },
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
