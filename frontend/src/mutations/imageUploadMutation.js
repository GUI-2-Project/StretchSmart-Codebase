import { gql } from '@apollo/client';

const ADD_QUESTION = gql`
  mutation uploadImageFile(
    $file: Upload!
    $filename: String!
  ) {
    addQuestion(
      file: $file
      filename: $filename
    ) {
      _id
    }
  }
`;

export { ADD_QUESTION, DELETE_QUESTION, UPDATE_QUESTION };
