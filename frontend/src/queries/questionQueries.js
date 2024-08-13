import { gql } from '@apollo/client';

const GET_QUESTIONS = gql`
  query getQuestions {
    questions {
      _id
      index
      question
      options
      selectionType
    }
  }
`;

const GET_QUESTION = gql`
  query getQuestion($_id: ID!) {
    question(_id: $_id) {
      _id
      index
      question
      options
      selectionType
    }
  }
`;

export { GET_QUESTIONS, GET_QUESTION };