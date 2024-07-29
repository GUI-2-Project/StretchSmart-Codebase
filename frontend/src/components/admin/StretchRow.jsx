import React from 'react'

const StretchRow = ({ stretch }) => {
  return (
    <tr>
        <td>{stretch.id}</td>
        <td>{stretch.title}</td>
        <td>{stretch.description}</td>
        <td>{stretch.goodFor.join(', ')}</td>
        <td>{stretch.badFor.join(', ')}</td>
        <td>{stretch.instructions}</td>
        <td>
            <img src={stretch.imageURL} alt={stretch.title} />
        </td>
        <td>
            <button>DELETE</button>
        </td>
    </tr>
  )
}

export default StretchRow