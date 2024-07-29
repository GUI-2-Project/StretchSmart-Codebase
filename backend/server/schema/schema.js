/**
 * This file contains the schema for the graphql server.
 * Not to be confused with the schema for the database.
 */


// Importe Database Schemas as Mongoose models
const Question = require("../models/Question");
const MuscleGroup = require("../models/MuscleGroup");
const Stretch = require("../models/Stretch");

// Import required data types from graphql
const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    //GraphQLEnumType
    } = require("graphql");

// Define Question graphql data type. TODO: revisit naming
const QuestionType = new GraphQLObjectType({
    name: "Question",
    fields: () => ({
        id: { type: GraphQLID },
        question: { type: GraphQLString },
        options: { type: GraphQLList(GraphQLString) }   // List of strings
    })
});

// Define MuscleGroup graphql data type
const MuscleGroupType = new GraphQLObjectType({
    name: "MuscleGroup",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        imageURL: { type: GraphQLString }
    })
});

// Define Stretch graphql data type
const StretchType = new GraphQLObjectType({
    name: "Stretch",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        goodFor: { type: GraphQLList(GraphQLString) },  // List of strings
        badFor: { type: GraphQLList(GraphQLString) },   // List of strings
        imageURL: { type: GraphQLString },
        instructions: { type: GraphQLString }
    })
});

// Define queries
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        questions: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find();
            }
        },
        question: {
            type: QuestionType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Question.findById(args.id);
            }
        },
        muscleGroups: {
            type: new GraphQLList(MuscleGroupType),
            resolve(parent, args) {
                return MuscleGroup.find();
            }
        },
        muscleGroup: {
            type: MuscleGroupType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return MuscleGroup.findById(args.id);
            }
        },
        stretches: {
            type: new GraphQLList(StretchType),
            resolve(parent, args) {
                return Stretch.find();
            }
        },
        stretch: {
            type: StretchType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Stretch.findById(args.id);
            }
        }
    }
});

// Define mutations
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // Add a question
        addQuestion: {
            type: QuestionType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                question: { type: GraphQLNonNull(GraphQLString) },
                options: { type: GraphQLNonNull(GraphQLList(GraphQLString)) }
            },
            resolve(parent, args) {
                let question = new Question({
                    id: args.id,
                    question: args.question,
                    options: args.options
                });

                return question.save();
            }
        },
        // Delete a question
        deleteQuestion: {
            type: QuestionType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Question.findByIdAndRemove(args.id);
            }
        },
        // Update a question
        updateQuestion: {
            type: QuestionType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                question: { type: GraphQLString },
                options: { type: GraphQLList(GraphQLString) }
            },
            resolve(parent, args) {
                return Question.findByIdAndUpdate(
                    args.id,
                    { $set: { 
                        question: args.question,
                        options: args.options 
                    } },
                    // Create a question if it doesn't exist
                    { new: true }
                );
            }
        },
        // Add a MuscleGroup
        addMuscleGroup: {
            type: MuscleGroupType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLNonNull(GraphQLString) },
                imageURL: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let muscleGroup = new MuscleGroup({
                    id: args.id,
                    name: args.name,
                    imageURL: args.imageURL
                });

                return muscleGroup.save();
            }
        },
        // Delete a MuscleGroup
        deleteMuscleGroup: {
            type: MuscleGroupType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return MuscleGroup.findByIdAndRemove(args.id);
            }
        },
        // Update a MuscleGroup
        updateMuscleGroup: {
            type: MuscleGroupType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                imageURL: { type: GraphQLString }
            },
            resolve(parent, args) {
                return MuscleGroup.findByIdAndUpdate(
                    args.id,
                    { $set: { 
                        name: args.name,
                        imageURL: args.imageURL
                    } },
                    // Create a muscle group if it doesn't exist
                    { new: true }
                );
            }
        },
        // Add a Stretch
        addStretch: {
            type: StretchType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                goodFor: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
                badFor: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
                imageURL: { type: GraphQLNonNull(GraphQLString) },
                instructions: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let stretch = new Stretch({
                    id: args.id,
                    title: args.title,
                    description: args.description,
                    goodFor: args.goodFor,
                    badFor: args.badFor,
                    imageURL: args.imageURL,
                    instructions: args.instructions
                });

                return stretch.save();
            }
        },
        // Delete a stretch
        deleteStretch: {
            type: StretchType,
            args: { id: { type: GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Stretch.findByIdAndRemove(args.id);
            }
        },
        // Update a stretch
        updateStretch: {
            type: StretchType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                goodFor: { type: GraphQLList(GraphQLString) },
                badFor: { type: GraphQLList(GraphQLString) },
                imageURL: { type: GraphQLString },     // TODO: handle images
                instructions: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Stretch.findByIdAndUpdate(
                    args.id,
                    { $set: { 
                        title: args.title,
                        description: args.description,
                        goodFor: args.goodFor,
                        badFor: args.badFor,
                        imageURL: args.imageURL,
                        instructions: args.instructions
                    } },
                    // Create a stretch if it doesn't exist
                    { new: true }
                );
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});