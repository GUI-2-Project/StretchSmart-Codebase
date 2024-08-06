import mongoose from 'mongoose';

// MuscleGroup Schema for mongoose connection to MongoDB database
const MuscleGroupSchema = new mongoose.Schema({
    // _id, the unique identifer, is implicitly created by MongoDB
    name: {
        type: String,
        required: [true, 'Please add a name']
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
