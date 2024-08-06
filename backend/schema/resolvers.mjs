import Question from '../models/Question.mjs';
import MuscleGroup from '../models/MuscleGroup.mjs';
import Stretch from '../models/Stretch.mjs';
import storeUpload from '../storeUpload.mjs';
import { Query } from 'mongoose';
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import fs, { createWriteStream, unlink } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATIC_FILE_PATH = 'http://localhost:5000/';

const resolvers = {
    Upload: GraphQLUpload,

    Query: {
        questions: async () => {
            return await Question.find();
        },
        questionById: async (_, { _id }) => {
            return await Question.findById(_id);
        },
        muscleGroups: async () => {
            const mgs = await MuscleGroup.find();
            mgs.forEach(mg => {
                mg.imageURL = `${STATIC_FILE_PATH}${mg._id}`;
            });
            return mgs;
        },
        muscleGroupById: async (_, { _id }) => {
            return await MuscleGroup.findById(_id);
        },
        muscleGroupByName: async (_, { name }) => {
            return await MuscleGroup.findOne({ name });
        },
        stretches: async () => {
            const strs = await Stretch.find();
            strs.forEach(str => {
                str.imageURL = `${STATIC_FILE_PATH}${str._id}`;
            });
            return strs;
        },
        stretchById: async (_, { _id }) => {
            return await Stretch.findById(_id);
        }
    },

    Mutation: {
        async addQuestion(_, { question, options }) {
            return await Question.create({ question, options });
        },
        async deleteQuestion(_, { _id }) {
            return await Question.findByIdAndDelete(_id).exec();
        },
        async updateQuestion(_, { _id, question, options }) {
            return await Question.findByIdAndUpdate(
                _id,
                { question, options },
                { new: true }
            ).exec();
        },
        async addMuscleGroup(_, { name, imageFile, stretchIds }) {
            const mg = await MuscleGroup.create({ name, stretchIds });
            mg.imageURL = `${STATIC_FILE_PATH}${mg._id}`;
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


        async addStretch(_, { title, description, goodFor, badFor, imageFile, instructions }) {
            const str = await Stretch.create({ title, description, goodFor, badFor, instructions });   
            str.imageURL = `${STATIC_FILE_PATH}${str._id}`;
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
            return await Stretch.findByIdAndDelete(_id).exec();
        },
        async updateStretch(_, { _id, title, description, imageURL, instructions }) {
            return await Stretch.findByIdAndUpdate(
                _id,
                { title, description, imageURL, instructions },
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