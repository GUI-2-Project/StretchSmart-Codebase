import React from 'react'
import Header from './Header'
import bodyImage from '../assets/fullBodyFrontBack.png'


function FrontPage() {
    const styles = {
        frontPage: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh'
        },
        mainContent: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            fex: 1,
        },
        leftSide: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '70vh',
            width: 'calc(100% - 600px)',
            backgroundColor: '#ECECEC',
            margin: '40px 80px',
            borderRadius: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            padding: "50px",
        },
        imageContainer: {
            flexBasis: '600px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '70px',
        },
        staticImage: {
            width: '500px',
            height: '100%',
            display: 'block',
        },
        questionsTitle: {
            color: '#2364E2',
            fontSize: '40px',
            textAlign: 'center',
        }
    };

    return (
        <div style={styles.frontPage}>
            <main style={styles.mainContent}>
                <div style={styles.leftSide}>
                    <h2 style={styles.questionsTitle}>HOW ARE YOU FEELING TODAY?</h2>
                </div>
                <div style={styles.imageContainer}>
                    <img src={bodyImage} style={styles.staticImage}></img>
                </div>

            </main>
        </div>
    )
}

export default FrontPage
 