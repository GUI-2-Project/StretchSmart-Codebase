import React from 'react';

import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_STRETCH } from '../../mutations/stretchMutations';

const StretchRow = ({ stretch }) => {
  
  // guard for empty or invalid "stretch" prop
  // (if statement guards less expensive than try/catch)
  if (typeof stretch != 'object') {
    return (
      <tr>
        <td>No Stretches Found</td>
      </tr>
    );
  };
  
  return (
    <tr>
      <td>{ stretch._id }</td>
      <td>{ stretch.title }</td>
      <td>{ stretch.description }</td>
      <td>{ stretch.goodFor }</td>
      <td>{ stretch.badFor }</td>
      <td>{ stretch.imageURL }</td>
      <td>{ stretch.instructions }</td>
      <td>
        <button>DELETE</button>
      </td>
    </tr>
  );
}

export default StretchRow;