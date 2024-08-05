/**
 * This file contains the schema for the graphql server.
 * Not to be confused with the schema for the database.
 */


// Importe Database Schemas as Mongoose models
import Question from '../models/Question.mjs';
import MuscleGroup from '../models/MuscleGroup.mjs';
import Stretch from '../models/Stretch.mjs';
import storeUpload from '../storeUpload.mjs';

// Import required data types from graphql
import { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    //GraphQLEnumType
    } from 'graphql';

import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';

/* TYPES */
// Define Question graphql data type. TODO: revisit naming
const QuestionType = new GraphQLObjectType({
    name: 'Question',
    fields: () => ({
        _id: { type: GraphQLID },
        question: { type: GraphQLString },
        options: { type: new GraphQLList(GraphQLString) }   // List of strings
    })
});

// Define MuscleGroup graphql data type
const MuscleGroupType = new GraphQLObjectType({
    name: 'MuscleGroup',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        stretches: { type: new GraphQLList(StretchType), // List of _ids for stretches for this muscle group
            resolve(parent, args) {
                return Stretch.find({
                    '_id': { $in: parent.stretchIds }
                });
            }
        }
    })
});

// Define Stretch graphql data type
const StretchType = new GraphQLObjectType({
    name: 'Stretch',
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        goodFor: { type: new GraphQLList(GraphQLString) },  // List of strings
        badFor: { type: new GraphQLList(GraphQLString) },   // List of strings
        imageURL: { type: GraphQLString },
        instructions: { type: GraphQLString }
    })
});

// Define Image graphql data type
const ImageFileType = new GraphQLObjectType({
    name: 'Image',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        URL: { type: GraphQLString }
    })
});


/* QUERIES */
// Define queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        questions: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find();
            }
        },
        question: {
            type: QuestionType,
            args: { _id: { type: GraphQLID } },
            resolve(parent, args) {
                return Question.findById(args._id);
            }
        },
        muscleGroups: {
            type: new GraphQLList(MuscleGroupType),
            resolve(parent, args) {
                return MuscleGroup.find();
            }
        },
        muscleGroupById: {
            type: MuscleGroupType,
            args: { _id: { type: GraphQLID } },
            resolve(parent, args) {
                return MuscleGroup.findById(args._id);
            }
        },
        muscleGroupByName: {
            type: MuscleGroupType,
            args: { name: { type: GraphQLString } },
            resolve(parent, args) {
                return MuscleGroup.findOne({ name: args.name }).exec();
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
            args: { _id: { type: GraphQLID } },
            resolve(parent, args) {
                return Stretch.findById(args._id);
            }
        }
    }
});


/* MUTATIONS */
// Define mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add a question
        addQuestion: {
            type: QuestionType,
            args: {
                //_id: { type: new GraphQLNonNull(GraphQLID) },     Let MongoDB handle uniquie ID generation
                question: { type: new GraphQLNonNull(GraphQLString) },
                options: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
            },
            resolve(parent, args) {
                let question = new Question({
                    _id: args._id,
                    question: args.question,
                    options: args.options
                });

                return question.save();
            }
        },
        // Delete a question
        deleteQuestion: {
            type: QuestionType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Question.findByIdAndDelete(args._id);
            }
        },
        // Update a question
        updateQuestion: {
            type: QuestionType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLID) },
                question: { type: GraphQLString },
                options: { type: new GraphQLList(GraphQLString) }
            },
            resolve(parent, args) {
                return Question.findByIdAndUpdate(
                    args._id,
                    { $set: { 
                        question: args.question,
                        options: args.options 
                    } },
                    // Create a question if it doesn't exist
                    // TODO: investigate if this is necessary
                    // With MongoDB handling ID creqation, this may cause collisions
                    { new: true }
                );
            }
        },
        // Add a MuscleGroup
        addMuscleGroup: {
            type: MuscleGroupType,
            args: {
                //_id: { type: new GraphQLNonNull(GraphQLID) },     Let MongoDB handle uniquie ID generation
                name: { type: new GraphQLNonNull(GraphQLString) },
                imageURL: { type: new GraphQLNonNull(GraphQLString) },
                stretchIds: { type: new GraphQLList(GraphQLID) }
            },
            resolve(parent, args) {
                let muscleGroup = new MuscleGroup({
                    _id: args._id,
                    name: args.name,
                    imageURL: args.imageURL,
                    stretchIds: args.stretchIds
                });

                return muscleGroup.save();
            }
        },
        // Delete a MuscleGroup
        deleteMuscleGroup: {
            type: MuscleGroupType,
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return MuscleGroup.findByIdAndDelete(args._id);
            }
        },
        // Update a MuscleGroup
        updateMuscleGroup: {
            type: MuscleGroupType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                imageURL: { type: GraphQLString },
                stretchIds: { type: new GraphQLList(GraphQLID) }
            },
            resolve(parent, args) {
                return MuscleGroup.findByIdAndUpdate(
                    args._id,
                    { $set: { 
                        name: args.name,
                        imageURL: args.imageURL,
                        stretchIds: args.stretchIds
                    } },
                    // Create a muscle group if it doesn't exist
                    // TODO: investigate if this is necessary
                    // With MongoDB handling ID creqation, this may cause collisions
                    { new: true }
                );
            }
        },
        // Add a Stretch
        addStretch: {
            type: StretchType,
            args: {
                //_id: { type: new GraphQLNonNull(GraphQLID) },     Let MongoDB handle uniquie ID generation
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                goodFor: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
                badFor: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
                imageURL: { type: new GraphQLNonNull(GraphQLString) },
                instructions: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let stretch = new Stretch({
                    _id: args._id,
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
            args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Stretch.findByIdAndDelete(args._id);
            }
        },
        // Update a stretch
        updateStretch: {
            type: StretchType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                goodFor: { type: new GraphQLList(GraphQLString) },
                badFor: { type: new GraphQLList(GraphQLString) },
                imageURL: { type: GraphQLString },     // TODO: handle images
                instructions: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Stretch.findByIdAndUpdate(
                    args._id,
                    { $set: { 
                        title: args.title,
                        description: args.description,
                        goodFor: args.goodFor,
                        badFor: args.badFor,
                        imageURL: args.imageURL,
                        instructions: args.instructions
                    } },
                    // Create a stretch if it doesn't exist
                    // TODO: investigate if this is necessary
                    // With MongoDB handling ID creqation, this may cause collisions
                    { new: true }
                );
            }
        },
        uploadFile: {
            type: new GraphQLNonNull(ImageFileType),
            args: {
                file: { type: new GraphQLNonNull(GraphQLUpload) },
                filename: { type: GraphQLString }   // optionally specify a filename
            },
            resolve(parent, args) {
                // set upload's filename if specified
                if (args.filename) {
                    args.file.filename = args.filename;
                }
                // store file
                storeUpload(args.file);
            }
        }
    }
});


// Export the schema
export default new GraphQLSchema({
    query: RootQuery,
    mutation
});