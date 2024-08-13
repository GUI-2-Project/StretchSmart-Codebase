import { gql } from '@apollo/client';

const ADD_STRETCH = gql`
  mutation addStretch(
    $title: String!
    $description: String!
    $goodFor: [String]
    $badFor: [String]
    $durationSeconds: Int
    $reps: Int
    $imageFile: Upload!
    $instructions: String!
  ) {
    addStretch(
      title: $title
      description: $description
      goodFor: $goodFor
      badFor: $badFor
      imageFile: $imageFile
      durationSeconds: $durationSeconds
      reps: $reps
      instructions: $instructions
    ) {
      _id
      title
      description
      goodFor
      badFor
      durationSeconds
      reps
      imageURL
      instructions
    }
  }
`;

const DELETE_STRETCH = gql`
  mutation deleteStretch($_id: ID!) {
    deleteStretch(_id: $_id) {
        _id
    }
  }
`;

const UPDATE_STRETCH = gql`
  mutation updateStretch(
    $_id: ID!
    $title: String
    $description: String
    $goodFor: [String]
    $badFor: [String]
    $durationSeconds: Int
    $reps: Int
    $imageFile: Upload
    $instructions: String
  ) {
    updateStretch(
      _id: $_id
      title: $title
      description: $description
      goodFor: $goodFor
      badFor: $badFor
      imageFile: $imageFile
      durationSeconds: $durationSeconds
      reps: $reps
      instructions: $instructions
    ) {
      _id
      title
      description
      goodFor
      badFor
      durationSeconds
      reps
      imageURL
      instructions
    }
  }
`;

export { ADD_STRETCH, DELETE_STRETCH, UPDATE_STRETCH };
