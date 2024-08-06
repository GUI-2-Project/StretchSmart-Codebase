import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_STRETCH } from '../../mutations/stretchMutations';
import { GET_STRETCHES } from '../../queries/stretchQueries';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const StretchRow = ({ stretch }) => {

  const [deleteStretch] = useMutation(DELETE_STRETCH, {
    variables: { _id: stretch._id },
    refetchQueries: [{ query: GET_STRETCHES }]
  });
  
  const handleDelete = (e) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this stretch?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteStretch()
        },
        {
          label: 'No',
          onClick: () => {} // do nothing
        }
      ]
    });
  }

  // guard for empty or invalid "stretch" prop
  // (if statement guards less expensive than try/catch)
  if (typeof stretch != 'object') {
    return (
      <tr>
        <td>No Stretches Found</td>
      </tr>
    );
  };

  const styles = {
    image: {
      height: '100px',
      width: '100px',
    }
  }
  
  return (
    <tr>
      <td>{stretch._id}</td>
      <td>{stretch.title}</td>
      <td>{stretch.description}</td>
      <td>{stretch.goodFor}</td>
      <td>{stretch.badFor}</td>
      <td>
        <img src={stretch.imageURL} style={styles.image} alt={stretch.imageURL} />
      </td>
      <td>{stretch.imageURL}</td>
      <td>{stretch.instructions}</td>
      <td>
        <button className="btn btn-danger" onClick={handleDelete}>DELETE</button>
      </td>
    </tr>
  );
}

export default StretchRow;