import { gql } from '@apollo/client';

const GET_QUESTIONS = gql`
  query getQuestions {
    questions {
      _id
      question
      options
    }
  }
`;

const GET_QUESTION = gql`
  query getQuestion($_id: ID!) {
    question(_id: $_id) {
      _id
      question
      options
    }
  }
`;

export { GET_QUESTIONS, GET_QUESTION };