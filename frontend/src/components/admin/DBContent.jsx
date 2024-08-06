import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

// Import table components for each type of content in DB
import Questions from './Questions';
import MuscleGroups from './MuscleGroups';
import Stretches from './Stretches';

// Import form components for adding new content to DB
import AddQuestion from './AddQuestion';
import AddMuscleGroup from './AddMuscleGroup';
import AddStretch from './AddStretch';

// Import queries
import { GET_QUESTIONS } from '../../queries/questionQueries';
import { GET_MUSCLE_GROUPS } from '../../queries/muscleGroupQueries';
import { GET_STRETCHES } from '../../queries/stretchQueries';

const DBContent = () => {

    //const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
    //const openAddQuestionModal = () => setIsAddQuestionOpen(true);
    //const closeAddQuestionModal = () => setIsAddQuestionOpen(false);

    //const [isAddMuscleGroupOpen, setIsAddMuscleGroupOpen] = useState(false);
    //const openAddMuscleGroupModal = () => setIsAddMuscleGroupOpen(true);
    //const closeAddMuscleGroupModal = () => setIsAddMuscleGroupOpen(false);

    //const [isAddStretchOpen, setIsAddStretchOpen] = useState(false);
    //const openAddStretchModal = () => setIsAddStretchOpen(true);
    //const closeAddStretchModal = () => setIsAddStretchOpen(false);

    // Query backend for list of questions for questionnaire
    const questions = useQuery(GET_QUESTIONS);
    const muscles = useQuery(GET_MUSCLE_GROUPS);
    const stretches = useQuery(GET_STRETCHES);

    // guard for failed or hanging queries
    const loadingAny = muscles.loading || stretches.loading || questions.loading;
    const errorAny = muscles.error || stretches.error || questions.error;
    if (loadingAny) return <p>Loading...</p>;
    if (errorAny) return <p>Something Went Wrong</p>;

    return (
        <>
            { !loadingAny && !errorAny && 
                <>
                    <Questions />
                    <MuscleGroups />
                    <Stretches />
                </>
            }

{/*            <AddQuestion isOpen={isAddQuestionOpen} onClose={closeAddQuestionModal} />   
            <AddMuscleGroup isOpen={isAddMuscleGroupOpen} onClose={closeAddMuscleGroupModal}/> 
            <AddStretch isOpen={isAddStretchOpen} onClose={closeAddStretchModal}/>*/}

        </>
    )
}

export default DBContent
