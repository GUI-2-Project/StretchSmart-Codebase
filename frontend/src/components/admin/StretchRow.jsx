import React from 'react';

import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_STRETCH } from '../../mutations/stretchMutations';
import { GET_STRETCHES } from '../../queries/stretchQueries';
import { GET_MUSCLE_GROUPS } from '../../queries/muscleGroupQueries';

export default function StretchRow({ stretch }) {
  const [deleteStretch] = useMutation(DELETE_STRETCH, {
    variables: { _id: stretch._id },
    refetchQueries: [{ query: GET_STRETCHES }, { query: GET_MUSCLE_GROUPS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });

  return (
    <tr>
      <td>{ stretch.title }</td>
      <td>{ stretch.description }</td>
      <td>{ stretch.goodFor }</td>
      <td>{ stretch.badFor }</td>
      <td>{ stretch.imageURL }</td>
      <td>{ stretch.instructions }</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteStretch}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}