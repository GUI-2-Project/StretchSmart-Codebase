import React from 'react'
import SidebarQuestionnaireQuestion from './SidebarQuestionnaireQuestion'

const SidebarQuestionnaire = () => {
    // TODO: refactor to accept a list/array of questions
    const styles = {
        questionnaire: {
            overflow: "auto",
            borderTop: "solid #b9b9b9 1px",
        }
    }
  return (
    <div style={styles.questionnaire}>
        <SidebarQuestionnaireQuestion question="Question 1"/>
        <SidebarQuestionnaireQuestion question="Question 2"/>
        <SidebarQuestionnaireQuestion question="Question 3"/>
        <SidebarQuestionnaireQuestion question="Question 4"/>
        <SidebarQuestionnaireQuestion question="Question 5"/>
        <SidebarQuestionnaireQuestion question="Question 6"/>
        <SidebarQuestionnaireQuestion question="Question 7"/>
        <SidebarQuestionnaireQuestion question="Question 8"/>
        <SidebarQuestionnaireQuestion question="Question 9"/>
        <SidebarQuestionnaireQuestion question="Question 10"/>
    </div>
  )
}

export default SidebarQuestionnaire