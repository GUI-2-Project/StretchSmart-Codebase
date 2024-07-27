import React from 'react'
import SidebarQuestionnaire from './SidebarQuestionnaire'
import hamstringsImage from '../assets/hamstrings.png'  // TODO: refactor to accept object from backend

/**
 * Sidebar to display info about the muscle group,
 * and an embedded SidebarQuestionnaire element.
 * 
 * @param {string} props.muscleGroup 
 * @returns {JSX.Element} aside element
 * @example
 * // render sidebar for Hamstrings muscle group
 * <Sidebar muscleGroup="Hamstrings" />
 */

const Sidebar = (props) => {
    // TODO: refactor to accept object from backend
    const styles = {
        aside: {
            display: "grid",
            gridTemplateRows: "auto 1frs",
            overflow: "hidden",
            textAlign: "center",
            width: "300px",
            backgroundColor: "#e9e9e9",
            borderRight: "solid #b9b9b9 1px",
        },
        img: {},
        title: {},
        questionnaire: {}
    }
  return (
    <aside style={styles.aside}>
        <div>
            <h1 style={styles.title}>Muscle Group:</h1>          {/* Title */}
            <img src={hamstringsImage} style={styles.img} />   {/* Muscle image // TODO: refactor to accept object from backend */}
            <h1 style={styles.title}>{props.muscleGroup}</h1>    {/* Muscle name */}
        </div>
        {/* TODO: replace with embedded-questionnaire component*/}
        <SidebarQuestionnaire />{/* Embedded questionnairre */}
    </aside>
  )
}

export default Sidebar