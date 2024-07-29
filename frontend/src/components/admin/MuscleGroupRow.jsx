import React from 'react'

const MuscleGroupRow = ({ muscleGroup }) => {
  return (
    <tr>
        <td>{muscleGroup.id}</td>
        <td>{muscleGroup.name}</td>
        <td>
            <img src={muscleGroup.imageURL} alt={muscleGroup.name} />
        </td>
        <td>
            <button>DELETE</button>
        </td>
    </tr>
  )
}

export default MuscleGroupRow