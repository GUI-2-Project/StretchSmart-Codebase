import { gql } from '@apollo/client';

const ADD_QUESTION = gql`
  mutation addQuestion(
    $question: String!
    $options: [String]!
    $selectionType: SelectionType!
  ) {
    addQuestion(
      question: $question
      options: $options
      selectionType: $selectionType
    ) {
      _id
      index
      question
      options
      selectionType
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
    $index: Int
    $question: String
    $options: [String]
    $selectionType: SelectionType!
  ) {
    updateQuestion(
      _id: $_id
      index: $index
      question: $question
      options: $options
      selectionType: $selectionType
    ) {
      _id
      index
      question
      options
      selectionType
    }
  }
`;

export { ADD_QUESTION, DELETE_QUESTION, UPDATE_QUESTION };
