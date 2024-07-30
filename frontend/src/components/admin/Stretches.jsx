import React from 'react';

import { useQuery } from '@apollo/client';
import StretchRow from './StretchRow';
//import Spinner from './Spinner';
import { GET_STRETCHES } from '../../queries/stretchQueries';

export default function Stretches() {
  const { loading, error, data } = useQuery(GET_STRETCHES);

  if (loading) return <p>Loading...</p>;// <Spinner />; // TODO: improve
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <table className='table table-hover mt-3'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Good For</th>
              <th>Bad For</th>
              <th>ImageURL</th>
              <th>Instructions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.stretches.map((stretch) => (
                <StretchRow key={stretch._id} stretch={stretch} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

//<StretchRow key={stretch._id} stretch={stretch} />

//<tr key={stretch._id}><td>{stretch.title}</td></tr>