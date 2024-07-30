import React, { useState } from 'react';
import health2 from '../../assets/health2.png';
import health3 from '../../assets/health3.png';
import Health1 from '../../assets/Health1.png';
import { auth } from '../../firebase/FireBase';
import { signInWithEmailAndPassword } from "firebase/auth";
import Signup from '../../components/signup/Signup';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    // open sign up as modal instead
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSuccess('Login Successful!');
            onLogin();
        } catch (error) {
            setError(error.message);
        }
    };

    const openSignupModal = () => setIsSignupModalOpen(true);
    const closeSignupModal = () => setIsSignupModalOpen(false);

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            minHeight: 'calc(100vh - 150px)',
            padding: '20px',
            backgroundColor: '#fff',
            marginTop: '10px',
            position: 'relative'
        },
        imagesContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            flex: 1,
            marginRight: '20px'
        },
        imageItem: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
        },
        stretchImage: {
            width: '300px',
            height: 'auto',
            borderRadius: '10px',
            marginBottom: '10px'
        },
        quote: {
            fontSize: '24px',
            fontStyle: 'italic',
            color: '#555',
            textAlign: 'left',
            marginLeft: '20px',
            maxWidth: '400px'
        },
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '500px',
            position: 'absolute',
            right: '20px',
            top: '100px'
        },
        title: {
            marginBottom: '20px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '10px'
        },
        input: {
            margin: '0',
            padding: '10px',
            width: '100%',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxSizing: 'border-box'
        },
        button: {
            padding: '15px',
            width: '100%',
            backgroundColor: '#007BFF',
            color: '#fff',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
            textTransform: 'uppercase',
            fontWeight: 'bold'
        },
        text: {
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '14px',
            color: '#666'
        },
        linkButton: {
            padding: '10px',
            width: '100%',
            backgroundColor: '#6c757d',
            color: '#fff',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
            textTransform: 'uppercase',
            fontWeight: 'bold'
        },
        bottomRightTextBox: {
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            textAlign: 'center',
            fontSize: '24px'
        },
        bottomRightButton: {
            backgroundColor: '#333',
            color: '#fff',
            padding: '15px 30px',
            borderRadius: '5px',
            marginTop: '20px',
            cursor: 'pointer',
            fontSize: '18px'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.imagesContainer}>
                <div style={styles.imageItem}>
                    <img src={health2} alt="Stretch Smart" style={styles.stretchImage} />
                    <p style={styles.quote}>Feeling pain or discomfort?</p>
                </div>
                <div style={styles.imageItem}>
                    <img src={health3} alt="Feeling Young" style={styles.stretchImage} />
                    <p style={styles.quote}>Not sure where to start when it comes to stretching your muscles?</p>
                </div>
                <div style={styles.imageItem}>
                    <img src={Health1} alt="Muscle Pain" style={styles.stretchImage} />
                    <p style={styles.quote}>Let us help you stretch smarter to feel better!</p>
                </div>
            </div>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Login Page</h2>
                <form style={styles.form} onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Enter Email Address"
                        style={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        style={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <button type="submit" style={styles.button}>Sign In</button>
                    {/* {isAuthenticated && <QuestionsPage />} */}
                </form>
                <p style={styles.text}> Not a member yet? Click below to Sign Up!</p>
                <button style={styles.linkButton} onClick={openSignupModal}>Create Account</button>
                <button style={styles.linkButton}>Reset Password</button>
            </div>
            {/* Signup modal */}
            <Signup isOpen={isSignupModalOpen} onClose={closeSignupModal} />
            <div style={styles.bottomRightTextBox}>
                <p>Try out our new web app today and learn how you can relieve your muscle pain! Click the button below to be redirected to our sign-up page.</p>
                <div style={styles.bottomRightButton} onClick={openSignupModal}>
                    Click here to try out the app today!
                </div>
            </div>
        </div>
    );
};

export default Login;
