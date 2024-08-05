import { gql } from '@apollo/client';

const UPLOAD_FILE = gql`
  mutation uploadFile(
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

export { UPLOAD_FILE };
