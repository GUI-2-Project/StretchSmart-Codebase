import React from 'react'
import SidebarQuestionnaire from './SidebarQuestionnaire'

/**
 * Sidebar to display info about the muscle group,
 * and an embedded SidebarQuestionnaire element.
 * 
 * @param {GraphQLObjectType} muscleGroup 
 * @returns {JSX.Element} aside element
 * @example
 * // render sidebar for Hamstrings muscle group
 * <Sidebar muscleGroup="Hamstrings" />
 */

const Sidebar = ({ muscleGroup }) => {
    const styles = {
        aside: {
            display: "grid",
            gridTemplateRows: "auto 1fr",
            overflow: "hidden",
            textAlign: "center",
            width: "350px",
            height: "100%",
            backgroundColor: "#e9e9e9",
            borderRight: "solid #b9b9b9 1px",
        },
        img: {
            width: "100%",
            height: "auto",
            objectFit: "cover",
            padding: "10%",
        },
        title: {},
        questionnaire: {}
    }
  return (
    <aside style={styles.aside}>
        <div>
            <h1 style={styles.title}>Muscle Group:</h1>
            <img src={muscleGroup.imageURL} style={styles.img} />
            <h1 style={styles.title}>{muscleGroup.name.toUpperCase()}</h1>
        </div>
        <SidebarQuestionnaire />{/* Embedded questionnaire */}
    </aside>
  )
}

export default Sidebar