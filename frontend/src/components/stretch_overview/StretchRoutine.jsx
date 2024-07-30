import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_STRETCH } from '../../queries/stretchQueries';

const StretchRoutine = ({ muscleGroup }) => {   // muscle group object

//const stretches = muscleGroup.stretches; // copy array of stretches
const stretches = muscleGroup.stretches.map((stretch) => {
    const { loading, error, data } = useQuery(GET_STRETCH, {
        variables: {_id: stretch}
    });
    while (loading) {};
    if (error) return <p>Something went wrong</p>;
    data;
});


let head = 0;
let tail = stretches.length - 1;




  return (
    <div>
        <p>{stretches[head].name}</p>
        <p>{stretches[head+1].n}</p>
    </div>
  )
}

export default StretchRoutine