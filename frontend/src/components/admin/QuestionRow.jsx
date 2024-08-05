import React from 'react'
import { useMutation } from '@apollo/client';
import { DELETE_QUESTION } from '../../mutations/questionMutations';
import { GET_QUESTIONS } from '../../queries/questionQueries';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const QustionRow = ({ question }) => {
  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    variables: { _id: question._id },
    refetchQueries: [{ query: GET_QUESTIONS }]
  });

  const handleDelete = (e) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this question?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteQuestion()
        },
        {
          label: 'No',
          onClick: () => {} // do nothing
        }
      ]
    });
  }

  // guard for empty or invalid "question" prop
  // (if statement guards less expensive than try/catch)
  if (typeof question != 'object') {
    return (
      <tr>
        <td>No Questions Found</td>
      </tr>
    );
  };

  return (
    <tr>
      <td>{question._id}</td>
      <td>{question.question}</td>
      <td>{question.options.join(', ')}</td>
      <td>
        <button className="btn btn-danger" onClick={handleDelete}>DELETE</button>
      </td>
    </tr>
  )
}

export default QustionRow