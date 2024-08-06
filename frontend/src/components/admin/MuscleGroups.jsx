// TODO: reformat to for consistncy

import React from 'react';

import { useQuery } from '@apollo/client';
import MuscleGroupRow from './MuscleGroupRow';
import { GET_MUSCLE_GROUPS } from '../../queries/muscleGroupQueries';

export default function MuscleGroups({ muscleGroups, handleAddMuscleGroup }) {
  const { loading, error, data } = useQuery(GET_MUSCLE_GROUPS);

  // guard for failed query
  if (loading) return <p>Loading...</p>;// <Spinner />; // TODO: improve
  if (error) return <p>Something Went Wrong</p>;

  const styles = {
    questions: {
      display: 'flex',
    },
    table: {
      width: '90%',
      margin: 'auto',
      marginTop: '20px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      textAlign: 'center',
      verticalAlign: 'middle',
    },
    tableTitle: {
      textAlign: 'center',
      margin: '20px',
      fontSize: 'x-large',
      fontWeight: 'bold',
    },
    buttonRow: {
      height: '65px',
    }
  }

  return (
    <div>
      {!loading && !error && (
        <table className='table table-hover mt-3' style={styles.table}>
          <thead>
            <tr>
              <th colSpan='6' style={styles.tableTitle}>Muscle Groups</th>
            </tr>
            <tr>
              <th>Unique ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Image URL</th>
              <th>Stretches</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.muscleGroups.map((muscleGroup) => (
                <MuscleGroupRow key={muscleGroup._id} muscleGroup={muscleGroup} />
            ))}
            <tr>
              <td style={styles.buttonRow}>
                {/* Add new content button */}
                <button className='btn btn-primary' onClick={handleAddMuscleGroup}>Add New Muscle Group</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
