import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_STRETCH } from '../../queries/stretchQueries';

const StretchRoutine = ({ muscleGroup }) => {   // muscle group object

////const stretches = muscleGroup.stretches; // copy array of stretches
//const stretches = muscleGroup.stretches.map((stretch) => {
//    const { loading, error, data } = useQuery(GET_STRETCH, {
//        variables: {_id: stretch}
//    });
//    while (loading) {};
//    if (error) return <p>Something went wrong</p>;
//    data;
//});
//
//
//let head = 0;
//let tail = stretches.length - 1;
//
//
//
//


  const stretch = muscleGroup.stretches[0];

  return (
    <div>
      <button >&times;</button>
      <h2>{stretch.title}</h2>
      <div>
          <p>{stretch.description}</p>
          <img src={stretch.imageURL}/>
          <p>{stretch.instructions}</p>
      </div>
    </div>
  )
}

export default StretchRoutine