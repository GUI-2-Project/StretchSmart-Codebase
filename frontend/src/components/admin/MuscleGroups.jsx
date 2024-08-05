// TODO: reformat to for consistncy

import React from 'react';

import { useQuery } from '@apollo/client';
import QuestionRow from './QuestionRow';
import { GET_MUSCLE_GROUPS } from '../../queries/muscleGroupQueries';

export default function MuscleGroups({ muscleGroup }) {


  const { loading, error, data } = useQuery(GET_MUSCLE_GROUPS);

  // guard for failed query
  if (loading) return <p>Loading...</p>;// <Spinner />; // TODO: improve
  if (error) return <p>Something Went Wrong</p>;

  return (
    <div>
      {!loading && !error && (
        <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Name</th>
              <th>Image URL</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.muscleGroups.map((muscleGroup) => (
                <MuscleGroupRow key={muscleGroup._id} muscleGroup={muscleGroup} />
            ))}
          </tbody>
        </table>
      )}
      {/* Add new content button */}
      <button className='btn btn-primary'>Add New Muscle Group</button>
    </div>
  );
}
