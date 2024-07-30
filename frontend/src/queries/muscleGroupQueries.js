import { gql } from '@apollo/client';

const GET_MUSCLE_GROUPS = gql`
  query getMuscleGroups {
    projects {
      _id
      name
      imageURL
      stretches
    }
  }
`;

const GET_MUSCLE_GROUP = gql`
  query getMuscleGroup($_id: ID!) {
    muscleGroup(_id: $_id) {
        _id
        name
        imageURL
        stretches
    }
  }
`;

export { GET_MUSCLE_GROUPS, GET_MUSCLE_GROUP };