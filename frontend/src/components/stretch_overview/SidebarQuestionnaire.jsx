import React from 'react'
import SidebarQuestionnaireQuestion from './SidebarQuestionnaireQuestion'
import { useQuery } from '@apollo/client';
import { GET_QUESTIONS } from '../../queries/questionQueries';

/**
 * Element for embedded questionnaire for use in Sidebar
 * Built to contain several SidebarQuestionnaireQuestion elements.
 * 
 * @returns {JSX.Element} div element containing multiple
 *                        SidebarQuestionnaireQuestion elements
 */

const SidebarQuestionnaire = () => {
    const { loading, error, data } = useQuery(GET_QUESTIONS);   // TODO: change to load stretch by id

    if (loading) return <p>Loading...</p>;// <Spinner />; // TODO: improve
    if (error) return <p>Something went wrong</p>;

    const styles = {
        questionnaire: {
            overflow: "auto",
            borderTop: "solid #b9b9b9 1px",
        }
    }
  return (
    <div style={styles.questionnaire}>
      {data.questions.map((question) => (
          <SidebarQuestionnaireQuestion key={question._id} question={question} />
      ))}
    </div>
  )
}

export default SidebarQuestionnaire