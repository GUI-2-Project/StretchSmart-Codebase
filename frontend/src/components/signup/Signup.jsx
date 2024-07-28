import React, { useState } from 'react';
import { auth } from '../../firebase/FireBase';
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess('Sign Up Was Successful!');
            setError(null);
            // Redirect to login or home page
        } catch (error) {
            setError(error.message);
            setSuccess(null);
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 150px)',
            padding: '20px',
            backgroundColor: '#fff',
            marginTop: '75px'
        },
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
            position: 'relative',
            top: '0',
            alignSelf: 'flex-start'
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
        error: {
            color: 'red',
            marginBottom: '10px'
        },
        success: {
            color: 'green',
            marginBottom: '10px'
        },
        text: {
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '14px',
            color: '#666'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Sign Up</h2>
                {error ? (<p style={styles.error}>{error}</p>) :
                (success && <p style={styles.success}>{success}</p>)}
                <form style={styles.form} onSubmit={handleSignup}>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter First Name"
                        style={styles.input}
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter Last Name"
                        style={styles.input}
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email Address"
                        style={styles.input}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
