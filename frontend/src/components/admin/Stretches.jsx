// TODO: reformat to for consistncy
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_STRETCHES } from '../../queries/stretchQueries';
import StretchRow from './StretchRow';

// Acceptes stretches object as prop, 
// or queries backend for stretches if no prop is provided
export default function Stretches({ stretches }) {

  // if no valid "stretches" prop, query backend from here
  if (typeof stretches != 'object') {
    stretches = useQuery(GET_STRETCHES);

    // guard for failed query
    if (stretches.loading) return <p>Loading...</p>;// <Spinner />; // TODO: improve
    if (stretches.error) return <p>Something Went Wrong</p>;
  };
  
  return (
    <div>
      {/* Table */}
      {!stretches.loading && !stretches.error && (
        <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Good For</th>
              <th>Bad For</th>
              <th>ImageURL</th>
              <th>Instructions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {stretches.data.stretches.map((stretch) => (
                <StretchRow key={stretch._id} stretch={stretch} />
            ))}
          </tbody>
        </table>
      )}
    {/* Add new content button */}
    <button className='btn btn-primary'>Add New Stretch</button>
    </div>
  );
}
