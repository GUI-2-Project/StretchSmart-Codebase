import React from 'react'
import { useQuery } from '@apollo/client'

// Import table components for each type of content in DB
import Questions from './Questions';
import MuscleGroups from './MuscleGroups';
import Stretches from './Stretches';

// Import queries
//import { GET_QUESTIONS } from '../../queries/questionQueries';
//import { GET_MUSCLE_GROUPS } from '../../queries/muscleGroupQueries';
//import { GET_STRETCHES } from '../../queries/stretchQueries';

// This is the ADMIN page

const DBContent = () => {

    // Queries were going to be handled here, but now they are handled by each respective table component
    // left in in case it becomes worhtwhile to handle them here
    //const questions = useQuery(GET_QUESTIONS);
    //const muscles = useQuery(GET_MUSCLE_GROUPS);
    //const stretches = useQuery(GET_STRETCHES);

    // guard for failed or hanging queries
    //const loadingAny = muscles.loading || stretches.loading || questions.loading;
    //const errorAny = muscles.error || stretches.error || questions.error;
    //if (loadingAny) return <p>Loading...</p>;
    //if (errorAny) return <p>Something Went Wrong</p>;

    return (
        <>
            { //!loadingAny && !errorAny && 
                <>
                    <Questions />
                    <MuscleGroups />
                    <Stretches />
                </>
            }
        </>
    )
}

export default DBContent
