import React from 'react'

const QustionRow = ({ question }) => {

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
      <td>{question.id}</td>
      <td>{question.question}</td>
      <td>{question.options.join(', ')}</td>
      <td>
        <button>DELETE</button>
      </td>
    </tr>
  )
}

export default QustionRow