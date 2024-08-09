import React from 'react';

import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_STRETCH } from '../../mutations/stretchMutations';
import { GET_STRETCHES } from '../../queries/stretchQueries';
import { GET_MUSCLE_GROUPS } from '../../queries/muscleGroupQueries';

export default function StretchRow({ stretch }) {
  

  return (
    <tr>
      <td>{ stretch.title }</td>
      <td>{ stretch.description }</td>
      <td>{ stretch.goodFor }</td>
      <td>{ stretch.badFor }</td>
      <td>{ stretch.imageURL }</td>
      <td>{ stretch.instructions }</td>
      <td>
        
      </td>
    </tr>
  );
}