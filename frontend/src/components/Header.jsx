import React from 'react'
import backButton from '../assets/backButtonIcon.png'
import logo from '../assets/stretchSmartLogo.png'
import profileIcon from '../assets/profileIcon.png'
import hamburgerIcon from '../assets/hamburgerIcon.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


/**
 * Header component to be used site-wide.
 *
 * @param {boolean} isAuthenticated - true if user is authenticated
 * @param {function} onLogin - function to run on user login
 * @param {function} onLogout - functio to run on user logout
 * @param {string} user - The user that's signed in.
 * @returns {JSX.Element} A rendered header element.
 * 
 * @example
 * // Render header for the user John Doe
 * <Header 
 *    isAuthenticated={isAuthenticated}
 *      onLogin={handleLogin}
 *      onLogout={handleLogout}
 *      user="John Doe"
 * />
 */

function Header({ isAuthenticated, onLogin, onLogout, user }) {

  const navigate = useNavigate(); // Initialize useNavigate

  const handleHamburgerClick = (e) => {
    if (isAuthenticated) navigate('/ADMIN');
  }

  const styles = {
    header: {
      display: "flex",
      background: "#D9D9D9",
      padding: "0px 10px",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "600",
      minHeight: "75px",
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    },
    segment: { // TODO: rename
      display: "flex",
      alignItems: "center"
    },
    nav: {
      padding: "10px",
      display: "flex",
    },
    a: {
      padding: "10px 60px 10px 0",
      fontSize: "16px",
      whiteSpace: "nowrap",
      textDecoration: "none"
    },
    icon: {
      padding: "10px",
      width: "60px",
    },
    logoContainer: {
      height: '91px',
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      padding: "20px 30px 10px 50px",
    },
    btn: {
      width: '80px',
      padding: '5px 0',
      marginRight: '10px',
      fontSize: '14px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    }
  }

  return (
      <header style={styles.header}>
        <div style={styles.segment}>
          {/* <img src={backButton} style={styles.icon}/> */}
          <div style={styles.logoContainer}>
          <img src={logo} style={styles.logo}/>
          </div>
          <nav style={styles.nav}>
            {isAuthenticated && (
              <>
              <Link style={styles.a} to="landing">HOME</Link>
              <Link style={styles.a} to="/questionnaire">QUESTIONNAIRE</Link>
              <Link style={styles.a} to="/history">HISTORY</Link>
              </>
            )}
            <a style={styles.a}>ABOUT US</a>
          </nav>
        </div>
        <div style={styles.segment}>
          {isAuthenticated && (
            <>
            <span style={styles.a}>WELCOME,  {user}</span>
            <button className="btn btn-primary" style={styles.btn} onClick={onLogout}>Logout</button>
            </>
          )}
              <img src={profileIcon} style={styles.icon}/>
              <a><img src={hamburgerIcon} style={styles.icon} onClick={handleHamburgerClick}/></a>
        </div>
      </header>
  )
}

export default Header


