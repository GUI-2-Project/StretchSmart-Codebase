import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

// Import table components for each type of content in DB
import Questions from './Questions';
import MuscleGroups from './MuscleGroups';
import Stretches from './Stretches';

// Import form components for adding new content to DB
import AddQuestion from './AddQuestion';
import AddMuscleGroup from './AddMuscleGroup';

// Import queries
import { GET_QUESTIONS } from '../../queries/questionQueries';
import { GET_MUSCLE_GROUPS } from '../../queries/muscleGroupQueries';
import { GET_STRETCHES } from '../../queries/stretchQueries';
import { ADD_STRETCH } from '../../mutations/stretchMutations';

const DBContent = () => {

    const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
    const openAddQuestionModal = () => setIsAddQuestionOpen(true);
    const closeAddQuestionModal = () => setIsAddQuestionOpen(false);

    const [isAddMuscleGroupOpen, setIsAddMuscleGroupOpen] = useState(false);
    const openAddMuscleGroupModal = () => setIsAddMuscleGroupOpen(true);
    const closeAddMuscleGroupModal = () => setIsAddMuscleGroupOpen(false);

    const [isAddStretchOpen, setIsAddStretchOpen] = useState(false);
    const openAddStretchModal = () => setIsAddStretchOpen(true);
    const closeAddStretchModal = () => setIsAddStretchOpen(false);

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
                    <Questions handleAddQuestion={openAddQuestionModal}/>
                    <MuscleGroups handleAddMuscleGroup={openAddMuscleGroupModal}/>
                    <Stretches handleAddStretch={openAddStretchModal}/>
                </>
            }

            <AddQuestion isOpen={isAddQuestionOpen} onClose={closeAddQuestionModal} />
            <AddMuscleGroup isOpen={isAddMuscleGroupOpen} onClose={closeAddMuscleGroupModal}/>

        </>
    )
}

export default DBContent


/*

question( question, options) {
    useMutation(ADD_QUESTION, {
        variables: { question, options }
    })
}

muscle group( name, description, image) {
    imageUploadSuccess = useMutation(UPLOAD_FILE, {
        variables: { file, filename }
    })
    
    if (!imageUploadSuccess) {
        return <p>Image upload failed</p>
    }

    STATIC_CONTENT_URL = new URL("../static_content/", import.meta.url);
    imageURL = new URL(image., STATIC_CONTENT_URL);

    addMclGrpSuccess = useMutation(ADD_MUSCLE_GROUP, {
        variables: { name, description, imageURL }
    })

    if (!addMclGrpSuccess) {
        return <p>Failed to add muscle group to database</p>
    }

    return <p>Muscle group added successfully</p>
}

stretch( name, description, image) {
    imageUploadSuccess = useMutation(UPLOAD_FILE, {
        variables: { file, filename }
    })
    
    if (!imageUploadSuccess) {
        return <p>Image upload failed</p>
    }

    addStretchSuccess = useMutation(ADD_STRETCH, {
        variables: { name, description, imageURL }
    })

    if (!addStretchSuccess) {
        return <p>Failed to add stretch to database</p>
    }

    return <p>Stretch added successfully</p>
}

*/