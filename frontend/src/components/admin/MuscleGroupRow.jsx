import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { DELETE_MUSCLE_GROUP, UPDATE_MUSCLE_GROUP } from '../../mutations/muscleGroupMutations';
import { GET_MUSCLE_GROUPS } from '../../queries/muscleGroupQueries';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { assertValidExecutionArguments } from 'graphql/execution/execute';
import { stringifyForDisplay } from '@apollo/client/utilities';
import ModifyMuscleGroup from './ModifyMuscleGroup';

const MuscleGroupRow = ({ muscleGroup }) => {
  const [isModifyMuscleGroupOpen, setIsModifyMuscleGroupOpen] = useState(false);
  const openModifyMuscleGroupModal = () => setIsModifyMuscleGroupOpen(true);
  const closeModifyMuscleGroupModal = () => setIsModifyMuscleGroupOpen(false);
 
  const [deleteMuscleGroup] = useMutation(DELETE_MUSCLE_GROUP, {
    variables: { _id: muscleGroup._id },
    refetchQueries: [{ query: GET_MUSCLE_GROUPS }]
  });

  const handleModify = (e) => {
    openModifyMuscleGroupModal();
  }

  const handleDelete = (e) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this muscle group?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteMuscleGroup()
        },
        {
          label: 'No',
          onClick: () => {} // do nothing
        }
      ]
    });
  }

  // guard for empty or invalid "muscleGroup" prop
  // (if statement guards less expensive than try/catch)
  if (typeof muscleGroup != 'object') {
    return (
      <tr>
        <td>No Muscle Groups Found</td>
      </tr>
    );
  };

  const styles = {
    image: {
      height: '100px',
      width: '100px',
    },
    button: {
      display: 'block',
      padding: '10px',
      margin:  'auto',
      marginTop: '5px',
      marginBottom: '5px',
    }
  }

  return (
    <tr>
        <td>{muscleGroup._id}</td>
        <td>{muscleGroup.name}</td>
        <td>
            <img src={muscleGroup.imageURL} style={styles.image} alt={muscleGroup.imageURL} />
        </td>
        <td>{muscleGroup.imageURL}</td>
        { muscleGroup.stretches &&
            <td>{muscleGroup.stretches.map((stretch) => (stretch.title)).join(', ')}</td> ||
            <td>No Stretches Found, or stretch IDs invalid</td>
        }
        <td>
          <button className="btn btn-warning" style={styles.button} onClick={handleModify}>Modify</button>
          <button className="btn btn-danger" style={styles.button} onClick={handleDelete}>DELETE</button>
        </td>
        <td>
          <ModifyMuscleGroup isOpen={isModifyMuscleGroupOpen} onClose={closeModifyMuscleGroupModal} muscleGroup={muscleGroup}/>
        </td>
    </tr>
  )
}

export default MuscleGroupRow