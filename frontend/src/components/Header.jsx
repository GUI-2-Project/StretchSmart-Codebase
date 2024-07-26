import React from 'react'
import backButton from '../assets/backButtonIcon.png'
import logo from '../assets/stretchSmartLogo.png'
import profileIcon from '../assets/profileIcon.png'
import hamburgerIcon from '../assets/hamburgerIcon.png'

const Header = (props) => {

  const styles = {

    header: {
      display: "flex",
      background: "#d9d9d9",
      padding: "0px 10px 0px 10px",
      justifyContent: "space-between",
      alignItems: "center"
    },
    segment: { // TODO: rename
      display: "flex",
      alignItems: "center"
    },
    nav: {
      padding: "10px",
    },
    a: {
      padding: "10px",
      fontSize: "18px",
      fontWeight: "bold",
      whiteSpace: "nowrap"
    },
    icon: {
      padding: "10px",
      width: "75px",
    }
  }

  return (
      <header style={styles.header}>
        <div style={styles.segment}>
          <img src={backButton} style={styles.icon}/>
          <img src={logo}/>
          <nav style={styles.nav}>
            <a style={styles.a}>HOME</a>
            <a style={styles.a}>ABOUT US</a>
            <a style={styles.a}>QUESTIONNAIRE</a>
            <a style={styles.a}>HISTORY</a>
          </nav>
        </div>
        <div style={styles.segment}>
          <a style={styles.a}>WELCOME {props.user}</a>
          <img src={profileIcon} style={styles.icon}/>
          <img src={hamburgerIcon} style={styles.icon}/>
        </div>
      </header>
  )
}

export default Header


