import mongoose from 'mongoose';

// User Schema for mongoose connection to MongoDB database
const UserSchema = new mongoose.Schema({
    // override mongoose's default _id with firebase's uid
    _id: {
        type: String,
        required: [true, 'Please add a title']
    },
    email: {
        type: String,
        required: [true, 'Please add a title']
    },
    firstName: {
        type: String,
        required: [true, 'Please add a description']
    },
    lastName: {
        type: String,
        required: [true, 'Please add an image']
    },
    likedStretchIDs: [  // NOTE: This is an array of strings
        { 
        type: String,
        }
    ],
    dislikedStretchIDs: [   // NOTE: This is an array of strings
        {
        type: String,
        }
    ],
});

export default mongoose.model('User', UserSchema);
