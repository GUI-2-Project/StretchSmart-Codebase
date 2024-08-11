const typeDefs = `#graphql
    scalar Upload

    type User {
        _id: ID!
        email: String!
        firstName: String!
        lastName: String!
        likedStretchIDs: [String]!
        dislikedStretchIDs: [String]!
    }

    """ For Questions, decide whether
    the user can select a single option
    or multiple options"""
    enum SelectionType {
        single
        multiple
    }

    type Question {
        _id: ID
        index: Int
        question: String
        options: [String]
        selectionType: SelectionType
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
        durationSeconds: Int
        reps: Int
        imageURL: String
        instructions: String
    }

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type Query {
        users: [User]
        userById(_id: ID!): User
        getSessionUser: User

        questions: [Question]
        questionById(_id: ID!): Question

        muscleGroups: [MuscleGroup]
        muscleGroupById(_id: ID!): MuscleGroup
        muscleGroupByName(name: String!): MuscleGroup

        stretches: [Stretch]
        stretchById(_id: ID!): Stretch
    }

    type Mutation {
        addUser(_id: ID!, email: String!, firstName: String!, lastName: String!, likedStretchIDs: [String]!, dislikedStretchIDs: [String]!): User
        deleteUser(_id: ID!): User
        updateUser(_id: ID!, email: String, firstName: String, lastName: String, likedStretchIDs: [String], dislikedStretchIDs: [String]): User
        setSessionUser(_id: ID!): User

        addQuestion(question: String!, options: [String]!, selectionType: SelectionType!): Question
        deleteQuestion(_id: ID!): Question
        updateQuestion(_id: ID!, index: Int, question: String, options: [String], selectionType: SelectionType): Question

        addMuscleGroup(name: String!, imageFile: Upload!, stretchIds: [ID]!): MuscleGroup
        deleteMuscleGroup(_id: ID!): MuscleGroup
        updateMuscleGroup(_id: ID!, name: String, imageURL: String, stretchIds: [ID]): MuscleGroup

        addStretch(title: String!, description: String!, goodFor: [String], badFor: [String], durationSeconds: Int!, reps: Int, imageFile: Upload!, instructions: String!): Stretch
        deleteStretch(_id: ID!): Stretch
        updateStretch(_id: ID!, title: String, description: String, goodFor: [String], badFor: [String], durationSeconds: Int, reps: Int, imageFile: Upload, instructions: String): Stretch

        singleUpload(file: Upload!, name: String): String
    }
`

export default typeDefs;