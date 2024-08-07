import { gql } from '@apollo/client';

const ADD_MUSCLE_GROUP = gql`
    mutation addMuscleGroup(
    $name: String!
    $imageURL: String!
    $stretchIds: [ID]!
  ) {
    addMuscleGroup(
      name: $name
      imageURL: $imageURL
      stretchIds: $stretchIds
    ) {
      _id
      name
      imageURL
      stretches {
        _id
        title
        description
        imageURL
        instructions
      }
    }
  }
`;

const DELETE_MUSCLE_GROUP = gql`
  query deleteMuscleGroup($_id: ID!) {
    deleteMuscleGroup(_id: $_id) {
        _id
    }
  }
`;

const UPDATE_MUSCLE_GROUP = gql`
    mutation updateMuscleGroup(
    $_id: ID!
    $name: String
    $imageURL: String
    $stretchIds: [ID]
  ) {
    updateMuscleGroup(
      _id: $_id
      name: $name
      imageURL: $imageURL
      stretchIds: $stretchIds
    ) {
      _id
      name
      imageURL
      stretches {
        _id
        title
        description
        imageURL
        instructions
      }
    }
  }
`;

export { ADD_MUSCLE_GROUP, DELETE_MUSCLE_GROUP, UPDATE_MUSCLE_GROUP };
