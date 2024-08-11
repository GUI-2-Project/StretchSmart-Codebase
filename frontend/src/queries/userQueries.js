import { gql } from '@apollo/client';

const GET_USERS = gql`
  query getUsers {
    users {
      _id
      email
      firstName
      lastName
      likedStretchIDs
      dislikedStretchIDs
    }
  }
`;

const GET_USER = gql`
  query getUser($_id: ID!) {
    user(_id: $_id) {
      _id
      email
      firstName
      lastName
      likedStretchIDs
      dislikedStretchIDs
    }
  }
`;

const GET_SESSION_USER = gql`
  query getSessionUser {
    getSessionUser {
      _id
      email
      firstName
      lastName
      likedStretchIDs
      dislikedStretchIDs
    }
  }
`;

export { GET_USERS, GET_USER, GET_SESSION_USER };
