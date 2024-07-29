import { gql } from '@apollo/client';

const GET_STRETCHES = gql`
  query getStretches {
    stretches {
        _id
        title
        description
        goodFor
        badFor
        imageURL
        instructions
    }
  }
`;

const GET_STRETCH = gql`
  query getStretch($_id: ID!) {
    stretch (_id: $_id) {
        _id
        title
        description
        goodFor
        badFor
        imageURL
        instructions
    }
  }
`;

export { GET_STRETCHES, GET_STRETCH };