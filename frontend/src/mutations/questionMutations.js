import { gql } from '@apollo/client';

const ADD_QUESTION = gql`
  mutation addQuestion(
    $question: String!
    $options: [String]!
  ) {
    addQuestion(
      question: $question
      options: $options
    ) {
      _id
      question
      options
    }
  }
`;

const DELETE_QUESTION = gql`
  mutation deleteQuestion($_id: ID!) {
    deleteQuestion(_id: $_id) {
        _id
    }
  }
`;

const UPDATE_QUESTION = gql`
  mutation updateQuestion(
    $_id: ID!
    $question: String
    $options: [String]
  ) {
    updateQuestion(
      _id: $_id
      question: $question
      options: $options
    ) {
      _id
      question
      options
    }
  }
`;

export { ADD_QUESTION, DELETE_QUESTION, UPDATE_QUESTION };
