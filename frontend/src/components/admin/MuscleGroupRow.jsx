import React from 'react'

const MuscleGroupRow = ({ muscleGroup }) => {

  // guard for empty or invalid "muscleGroup" prop
  // (if statement guards less expensive than try/catch)
  if (typeof muscleGroup != 'object') {
    return (
      <tr>
        <td>No Muscle Groups Found</td>
      </tr>
    );
  };

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