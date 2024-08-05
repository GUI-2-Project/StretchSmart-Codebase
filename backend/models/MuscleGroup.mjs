import mongoose from 'mongoose';
import Stretch from './Stretch.mjs';

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
    stretchIds: [    // Note: this is an array of stretch _ids
        {
            type:  mongoose.Types.ObjectId,
            required: [true, 'Please add at least one stretch _id'],
            ref: 'Stretch'
        }
    ]
});

export default mongoose.model('MuscleGroup', MuscleGroupSchema);


/**
 * Neck
 *  <image>
 * 
 */