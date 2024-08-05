import React from 'react'

const QustionRow = ({ question }) => {
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
