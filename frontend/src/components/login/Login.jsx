import React, { useState } from 'react';
import health2 from '../../assets/health2.png';
import { auth } from '../../firebase/FireBase';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to home page or dashboard
        } catch (error) {
            setError(error.message);
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            minHeight: 'calc(100vh - 150px)', // Adjust based on header/footer height
            padding: '20px',
            backgroundColor: '#fff', // Changed to white background
            marginTop: '10px' // Adjust this value based on the height of your navbar
        },
        imagesContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            flex: 1,
        },
        imageItem: {
            display: 'flex',
            alignItems: 'center',
        },
        stretchImage: {
            width: '300px', // Adjust size as needed
            height: 'auto', // Maintain aspect ratio
            borderRadius: '10px',
            marginBottom: '10px'
        },
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%', // Make form wider
            maxWidth: '500px', // Increase max width
            position: 'absolute', // Use absolute positioning
            right: '20px', // Position to the right
            top: '100px' // Adjust this value based on the height of your navbar
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
            gap: '10px' // Adds space between form elements
        },
        input: {
            margin: '0', // Remove margin to avoid overflow
            padding: '10px', // Adjust padding as needed
            width: '100%',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxSizing: 'border-box' // Ensure padding is included in the width
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
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.imagesContainer}>
                <div style={styles.imageItem}>
                    <img src={health2} alt="Stretch Smart" style={styles.stretchImage} />
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
                    <button type="submit" style={styles.button}>Sign In</button>
                </form>
                <p style={styles.text}> Not a member yet? Click below to Sign Up!</p>
                <button style={styles.linkButton} onClick={() => window.location.href='/signup'}>Create Account</button>
                <button style={styles.linkButton}>Reset Password</button>
            </div>
        </div>
    );
};

export default Login;
