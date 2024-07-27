import React from 'react'

/**
 * Unfinished element containing a question and multiple checkboxes
 * for use in SidebarQuestionnaire
 * 
 * @param {string} props.question 
 * @returns {JSX.Element} div element containing a question and two check boxes
 */

const SidebarQuestionnaireQuestion = (props) => {
    // TODO: refactor to accept a list/array of options
    const styles = {
        question: {
            padding: "15px",
            border: "solid #b9b9b9 1px"
        },
        h3: { 
            margin: "0px 0px 10px 0px " 
        },
        options: {},
        label: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            
        },
        checkbox: {
            margin: "0px 10px 0px 0px " 
        }
    }

  return (
    <div style={styles.question}>
        {/* Question title */}
        <h3 style={styles.h3}>{props.question}</h3>

        {/* Options */}
        <div style={styles.options}>
            <label style={styles.label}>
                <input type="checkbox" style={styles.checkbox}/>
                Checkbox 1
            </label>
            <label style={styles.label}>
                <input type="checkbox" style={styles.checkbox}/>
                Checkbox 2
            </label>
        </div>
    </div>
  )
}

export default SidebarQuestionnaireQuestion