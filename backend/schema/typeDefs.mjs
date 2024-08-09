const typeDefs = `#graphql
    scalar Upload

    type Question {
        _id: ID
        question: String
        options: [String]
    }

    type MuscleGroup {
        _id: ID
        name: String
        imageURL: String
        stretches: [Stretch]
    }

    type Stretch {
        _id: ID
        title: String
        description: String
        goodFor: [String]
        badFor: [String]
        imageURL: String
        instructions: String
    }


    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }


    type Query {
        questions: [Question]
        questionById(_id: ID!): Question
        muscleGroups: [MuscleGroup]
        muscleGroupById(_id: ID!): MuscleGroup
        muscleGroupByName(name: String!): MuscleGroup
        stretches: [Stretch]
        stretchById(_id: ID!): Stretch
    }

    type Mutation {
        addQuestion(question: String!, options: [String]!): Question
        deleteQuestion(_id: ID!): Question
        updateQuestion(_id: ID!, question: String, options: [String]): Question

        addMuscleGroup(name: String!, imageFile: Upload!, stretchIds: [ID]!): MuscleGroup
        deleteMuscleGroup(_id: ID!): MuscleGroup
        updateMuscleGroup(_id: ID!, name: String, imageURL: String, stretchIds: [ID]): MuscleGroup

        addStretch(title: String!, description: String!, goodFor: [String], badFor: [String] imageFile: Upload!, instructions: String!): Stretch
        deleteStretch(_id: ID!): Stretch
        updateStretch(_id: ID!, title: String, description: String, imageURL: String, instructions: String): Stretch

        singleUpload(file: Upload!, name: String): String
    }
`

export default typeDefs;