import { gql } from '@apollo/client';

const ADD_USER = gql`
  mutation addUser(
      $_id: ID!
      $email: String!
      $firstName: String!
      $lastName: String!
      $likedStretchIDs: [String]!
      $dislikedStretchIDs: [String]!
  ) {
    addUser(
      _id: $_id
      email: $email
      firstName: $firstName
      lastName: $lastName
      likedStretchIDs: $likedStretchIDs
      dislikedStretchIDs: $dislikedStretchIDs
    ) {
      _id
      email
      firstName
      lastName
      likedStretchIDs
      dislikedStretchIDs
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($_id: ID!) {
    deleteUser(_id: $_id) {
        _id
    }
  }
`;

const UPDATE_USER = gql`
    mutation updateUser(
      $_id: ID!
      $email: String
      $firstName: String
      $lastName: String
      $likedStretchIDs: [String]
      $dislikedStretchIDs: [String]
  ) {
    updateUser(
      _id: $_id
      email: $email
      firstName: $firstName
      lastName: $lastName
      likedStretchIDs: $likedStretchIDs
      dislikedStretchIDs: $dislikedStretchIDs
    ) {
      _id
      email
      firstName
      lastName
      likedStretchIDs
      dislikedStretchIDs
    }
  }
`;

const SET_SESSION_USER = gql`
  mutation setSessionUser($_id: ID!) {
    setSessionUser(_id: $_id) {
      _id
    }
  }
`;

export { ADD_USER, DELETE_USER, UPDATE_USER, SET_SESSION_USER };
