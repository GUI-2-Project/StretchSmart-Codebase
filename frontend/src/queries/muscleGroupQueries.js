import { gql } from '@apollo/client';

const GET_MUSCLE_GROUPS = gql`
  query getMuscleGroups {
    muscleGroups {
      _id
      name
      imageURL
      stretches {
        _id
        title
        description
        goodFor
        badFor
        durationSeconds
        reps
        imageURL
        instructions
      }
    }
  }
`;

const GET_MUSCLE_GROUP_BYID = gql`
    query getMuscleGroupById($_id: ID!) {
    muscleGroupById(_id: $_id) {
        _id
        name
        imageURL
        stretches {
          _id
          title
          description
          goodFor
          badFor
          durationSeconds
          reps
          imageURL
          instructions
        }
    }
  }
`;

const GET_MUSCLE_GROUP_BYNAME = gql`
    query getMuscleGroupByName($name: String!) {
    muscleGroupByName(name: $name) {
        _id
        name
        imageURL
        stretches {
          _id
          title
          description
          goodFor
          badFor
          durationSeconds
          reps
          imageURL
          instructions
        }
    }
  }
`;

export { GET_MUSCLE_GROUPS, GET_MUSCLE_GROUP_BYID, GET_MUSCLE_GROUP_BYNAME };