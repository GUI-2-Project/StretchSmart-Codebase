import { React, useState, useEffect } from 'react'
import backButton from '../assets/backButtonIcon.png'
import logo from '../assets/stretchSmartLogo.png'
import profileIcon from '../assets/profileIcon.png'
import hamburgerIcon from '../assets/hamburgerIcon.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";
<<<<<<< Updated upstream
import { Link } from "react-router-dom";
=======
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { getAuth } from 'firebase/auth';
import {getFirestore, doc, getDoc} from "firebase/firestore";

>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
function Header({ isAuthenticated, onLogin, onLogout, user }) {
=======
function Header({ isAuthenticated, onLogin, onLogout }) {
  const [userName, setUserName] = useState('');
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    if (isAuthenticated) {
      const user = auth.currentUser;

      if (user) {
        const displayName = user.displayName;
        if (displayName) {
          setUserName(displayName);
        } else {
          // Fetch user's first and last name from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          getDoc(userDocRef).then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              const fullName = `${userData.firstName} ${userData.lastName}`;
              setUserName(fullName);
            } else {
              console.log('No such document!');
            }
          }).catch((error) => {
            console.error('Error fetching user data:', error);
          });
        }
      }
    }
  }, [isAuthenticated, auth, db]);

>>>>>>> Stashed changes
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
    segment: {
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
          <div style={styles.logoContainer}>
            <img src={logo} style={styles.logo} alt="logo" />
          </div>
          <nav style={styles.nav}>
            {isAuthenticated && (
                <>
                  <Link style={styles.a} to="landing">HOME</Link>
                  <Link style={styles.a} to="/questionnaire">QUESTIONNAIRE</Link>
                  <Link style={styles.a} to="/history">HISTORY</Link>
                </>
            )}
            <Link style={styles.a} to="/AboutUs">ABOUT US</Link>
          </nav>
        </div>
        <div style={styles.segment}>
          {isAuthenticated && (
              <>
                <span style={styles.a}>WELCOME, {userName}</span>
                <button className="btn btn-primary" style={styles.btn} onClick={onLogout}>Logout</button>
              </>
          )}
          <div className="dropdown">
            <img
                src={profileIcon}
                style={styles.icon}
                alt="profile"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            />
            <ul className="dropdown-menu" aria-labelledby="profileDropdown">
              {isAuthenticated && (
                  <>
                    <li><Link className="dropdown-item" to="landing">HOME</Link></li>
                    <li><Link className="dropdown-item" to="/questionnaire">QUESTIONNAIRE</Link></li>
                    <li><Link className="dropdown-item" to="/history">HISTORY</Link></li>
                  </>
              )}
              <li><Link className="dropdown-item" to="/about">ABOUT US</Link></li>
            </ul>
          </div>
          <img
              src={hamburgerIcon}
              style={styles.icon}
              alt="menu"
              id="hamburgerDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
          />
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="hamburgerDropdown">
            {isAuthenticated && (
                <>
                  <li><Link className="dropdown-item" to="landing">HOME</Link></li>
                  <li><Link className="dropdown-item" to="/questionnaire">QUESTIONNAIRE</Link></li>
                  <li><Link className="dropdown-item" to="/history">HISTORY</Link></li>
                </>
            )}
            <li><Link className="dropdown-item" to="/AboutUs">ABOUT US</Link></li>
          </ul>
        </div>
      </header>
  );
}

export default Header;


