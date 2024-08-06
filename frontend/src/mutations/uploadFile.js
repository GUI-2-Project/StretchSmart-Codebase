import { gql } from '@apollo/client';

const UPLOAD_FILE = gql`
  mutation uploadFile(
    $file: Upload!
    $filename: String
  ) {
    uploadFile(
      file: $file
      filename: $filename
    ) {
      true
    }
  }
`;

export { UPLOAD_FILE };
