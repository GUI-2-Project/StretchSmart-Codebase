import { gql } from '@apollo/client';

const ADD_MUSCLE_GROUP = gql`
  mutation addMuscleGroup(
    $name: String!
    $imageURL: String!
    $stretches: [String]!
  ) {
    addMuscleGroup(
      name: $name
      imageURL: $imageURL
      stretches: $stretches
    ) {
      _id
      name
      imageURL
      stretches
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
    $stretches: [String]
  ) {
    updateMuscleGroup(
      _id: $_id
      name: $name
      imageURL: $imageURL
      stretches: $stretches
    ) {
      _id
      name
      imageURL
      stretches
    }
  }
`;

export { ADD_MUSCLE_GROUP, DELETE_MUSCLE_GROUP, UPDATE_MUSCLE_GROUP };
