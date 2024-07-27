const mongoose = require('mongoose');

// Option Schema for mongoose connection to MongoDB database
const OptionSchema = new mongoose.Schema({
    option: {
        type: String,
        required: [true, 'Please add an option']
    }
});

// Question Schema for mongoose connection to MongoDB database
const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please add a name']
    },
    options: {
        type: [OptionSchema],
        required: [true, 'Please add at least one option']
    }
});

module.exports = mongoose.model('Question', QuestionSchema);


/**
 * What is your energy level like currently?
 *      Tired
 *      Energetic
 *      Moderate energy
 *  What are you feeling in your insert selected muscle (can select multiple)
 *      Soreness
 *      Pain
 *      Stiffness/Lack of mobility
 *      No Discomfort
 *  What is your goal for today’s session? (can select multiple)
 *      Pain relief
 *      Muscle recovery
 *      Improved mobility
 *      I just wanna stretch!
 *      Strength 
 */