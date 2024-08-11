import Question from '../models/Question.mjs';
import MuscleGroup from '../models/MuscleGroup.mjs';
import Stretch from '../models/Stretch.mjs';
import User from '../models/User.mjs'
import storeUpload from '../storeUpload.mjs';
import { Query } from 'mongoose';
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import fs, { createWriteStream, unlink } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATIC_FILE_PATH = 'http://api.stretchsmart.xyz:5000/';
//const STATIC_FILE_PATH = 'http://localhost:5000/';

const resolvers = {
    Upload: GraphQLUpload,  // required for the Upload scalar type

    Query: {
        users: async () => {
            return await User.find();
        },
        userById: async (_, { _id }) => {
            return await User.findById(_id);
        },
        getSessionUser: async (_, __, { user }) => {
            return session.user;
        },
        questions: async () => {
            //return await Question.find().sort({index: 'asc'});
            return await Question.find();
        },
        questionById: async (_, { _id }) => {
            return await Question.findById(_id);
        },
        muscleGroups: async () => {
            const mgs = await MuscleGroup.find();
            mgs.forEach(mg => {
                mg.imageURL = `${STATIC_FILE_PATH}${mg._id}`;
                mg.stretches = mg.stretchIds.map( async (_id) => {
                    const str = await Stretch.findById(_id);
                    str.imageURL = `${STATIC_FILE_PATH}${str._id}`;
                    console.log(str);
                    return str;
                });
            });
            return mgs;
        },
        muscleGroupById: async (_, { _id }) => {
            const mg = await MuscleGroup.findById(_id);
            mg.stretches = mg.stretchIds.map( async (_id) => {
                const str = await Stretch.findById(_id);
                str.imageURL = `${STATIC_FILE_PATH}${str._id}`;
                console.log(str);
                return str;
            });
            return mg;
        },
        muscleGroupByName: async (_, { name }) => {
            const mg = await MuscleGroup.findOne({name: {'$regex': name, '$options': 'i'}});
            mg.imageURL = `${STATIC_FILE_PATH}${mg._id}`;
            mg.stretches = mg.stretchIds.map( async (_id) => {
                const str = await Stretch.findById(_id);
                str.imageURL = `${STATIC_FILE_PATH}${str._id}`;
                console.log(str);
                return str;
            });
            return mg;
        },
        stretches: async () => {
            const strs = await Stretch.find();
            strs.forEach(str => {
                str.imageURL = `${STATIC_FILE_PATH}${str._id}`;
            });
            return strs;
        },
        stretchById: async (_, { _id }) => {
            const str = await Stretch.findById(_id);
            str.imageURL = `${STATIC_FILE_PATH}${str._id}`;
            return str;
        }
    },

    Mutation: {
        async addUser(_, { _id, email, firstName, lastName, likedStretchIDs, dislikedStretchIDs }) {
            return await User.create({ _id, email, firstName, lastName, likedStretchIDs, dislikedStretchIDs });
        },
        async deleteUser(_, { _id }) {
            return await User.findByIdAndDelete(_id).exec();
        },
        async updateUser(_, { _id, email, firstName, lastName, likedStretchIDs, dislikedStretchIDs }) {
            return await User.findByIdAndUpdate(
                _id, 
                { email, firstName, lastName, likedStretchIDs, dislikedStretchIDs }, 
                { new: true }
            ).exec();
        },
        // set session user to user from cookie
        async setSessionUser(_, { _id }) {
            return session.user = _id;
        },

        async addQuestion(_, { question, options, selectionType }) {
                const index = await Question.countDocuments();
                return await Question.create({ index, question, options, selectionType });
        },
        async deleteQuestion(_, { _id }) {
            return await Question.findByIdAndDelete(_id).exec();
        },
        async updateQuestion(_, { _id, index, question, options, selectionType }) {
            return await Question.findByIdAndUpdate(
                _id,
                { index, question, options, selectionType },
                { new: true }
            ).exec();
        },

        async addMuscleGroup(_, { name, imageFile, stretchIds }) {
            // Create a new MuscleGroup object
            const mg = await MuscleGroup.create({ name, stretchIds });

            // Set the imageURL property to the path of the image file
            mg.imageURL = `${STATIC_FILE_PATH}${mg._id}`;

            // Store the image file in the static_content directory
            MuscleGroup.findByIdAndUpdate(mg._id, { imageURL: mg.imageURL });
            const { createReadStream } = await imageFile;
            await new Promise((resolve, reject) => {
                const stream = createReadStream()
                    .pipe(createWriteStream(
                        path.join(__dirname, '../static_content/', mg._id.toString()),
                        { autoClose: true }
                    )
                    .on('close', resolve)
                    .on('finish', resolve)
                    .on('error', (error) => {
                        unlink(`../static_content/${mg._id}`, () => {
                            reject(error);
                        });
                    })
                );
            });
            return mg;
        },
        async deleteMuscleGroup(_, { _id }) {
            const imagePath = path.join(__dirname, '../static_content/', _id.toString());
            fs.unlink(imagePath, (err => { 
                if (err) {
                    console.log(err); 
                    return;
                } else {
                    console.log('Image deleted successfully');
                }
            })); 
            return await MuscleGroup.findByIdAndDelete(_id).exec();
        },
        async updateMuscleGroup(_, { _id, name, imageURL, stretchIds }) {
            return await MuscleGroup.findByIdAndUpdate(
                _id,
                { name, imageURL, stretchIds },
                { new: true }
            ).exec();
        },

        async addStretch(_, { title, description, goodFor, badFor, durationSeconds, reps, imageFile, instructions }) {
            const str = await Stretch.create({ title, description, goodFor, badFor, durationSeconds, instructions });
            str.reps = (reps) ? reps : 1;   // default to 1 rep if not provided
            str.imageURL = `${STATIC_FILE_PATH}${str._id}`;
            Stretch.findByIdAndUpdate(str._id, { imageURL: str.imageURL });
            const { createReadStream } = await imageFile;
            await new Promise((resolve, reject) => {
                const stream = createReadStream()
                    .pipe(createWriteStream(
                        path.join(__dirname, '../static_content/', str._id.toString()),
                        { autoClose: true }
                    )
                    .on('close', resolve)
                    .on('finish', resolve)
                    .on('error', (error) => {
                        unlink(`../static_content/${str._id}`, () => {
                            reject(error);
                        });
                    })
                );
            });
            return str;
        },
        async deleteStretch(_, { _id }) {
            const imagePath = path.join(__dirname, '../static_content/', _id.toString());
            fs.unlink(imagePath, (err => { 
                if (err) {
                    console.log(err); 
                    return;
                } else {
                    console.log('Image deleted successfully');
                }
            })); 
            return await Stretch.findByIdAndDelete(_id).exec();
        },
        async updateStretch(_, { _id, title, description, goodFor, badFor, durationSeconds, reps, imageFile, instructions }) {
            // handle image upload if provided
            if (imageFile != null) {
                // delete old image
                const imagePath = path.join(__dirname, '../static_content/', _id.toString());
                fs.unlink(imagePath, (err => { 
                    if (err) {
                        console.log(err); 
                        return;
                    } else {
                        console.log('Image deleted successfully');
                    }
                })); 

                // write new image file to the static_content directory
                const { createReadStream } = await imageFile;
                await new Promise((resolve, reject) => {
                    const stream = createReadStream()
                        .pipe(createWriteStream(
                            path.join(__dirname, '../static_content/', _id.toString()),
                            { autoClose: true }
                        )
                        .on('close', resolve)
                        .on('finish', resolve)
                        .on('error', (error) => {
                            unlink(`../static_content/${_id}`, () => {
                                reject(error);
                            });
                        })
                    );
                });
            }
            if (!reps) {
                reps = 1;
            }
            return await Stretch.findByIdAndUpdate(
                _id,
                { title, description, goodFor, badFor, durationSeconds, reps, instructions },
                { new: true }
            ).exec();
        },

        async singleUpload(_, { file, name }) {
            const { createReadStream } = await file;
            //const { url } = await storeUpload({ stream, filename });
            await new Promise((resolve, reject) => {
                const stream = createReadStream()
                    .pipe(createWriteStream(
                        path.join(__dirname, '../static_content/', name),
                        { autoClose: true }
                    )
                    .on('close', resolve)
                    .on('finish', resolve)
                    .on('error', (error) => {
                        unlink(`../static_content/${name}`, () => {
                            reject(error);
                        });
                    })
                );
            });
            return "WORKING";
        },
    }
};

export default resolvers;