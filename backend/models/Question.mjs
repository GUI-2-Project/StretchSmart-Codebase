import mongoose from 'mongoose';

// Question Schema for mongoose connection to MongoDB database
const QuestionSchema = new mongoose.Schema({
    index: {
        type: Number,
        required: [true, 'Please add an index']
    },
    question: {
        type: String,
        required: [true, 'Please add a name']
    },
    options: [      // NOTE: This is an array of strings
        {
        type: String,
        required: [true, 'Please add at least one option']
        }
    ],
    selectionType: {
        type: String,
        enum : ['single', 'multiple'],
        required: [true, 'Please add a selection type']
    }
});

export default mongoose.model('Question', QuestionSchema);
