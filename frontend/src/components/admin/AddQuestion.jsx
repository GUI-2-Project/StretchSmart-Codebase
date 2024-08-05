import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_QUESTION } from '../../mutations/questionMutations'
import { GET_QUESTIONS } from '../../queries/questionQueries';
import Modal from './Modal'

const AddQuestion = ({ isOpen, onClose }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const addNewOptionField = () => {
        const tmpOptions = [...options];
        tmpOptions.push('');
        setOptions(tmpOptions);
    }

    const setOption = (value, index) => {
        const tmpOptions = [...options];
        tmpOptions[index] = value;
        setOptions(tmpOptions);
    }

    const [addQustion] = useMutation(ADD_QUESTION, {
        variables: { question: question, options: options },
        refetchQueries: [{ query: GET_QUESTIONS }]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            addQustion(question, options);
            setSuccess('Question Added Successfully!');
            setError(null);
            setTimeout(onClose, 2000);
            onClose();
        } catch (error) {
            setError(error.message);
            setSuccess(null);
        }
    }

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
        closeButton: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            frontSize: '20px',
            cursor: 'pointer'
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

    return isOpen ? (
        <Modal>
            <div style={styles.formContainer}>
                <button style={styles.closeButton} onClick={onClose}>&times;</button>
                <h2 style={styles.title}>Add a Question</h2>
                <form style={styles.form} onSubmit={handleSubmit}>
                    
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter Question"
                        style={styles.input}
                    />

                    {/* map over options and create input fields */}
                    {
                        options.map((option, index) => (
                            <input
                                key={index}
                                type="text"
                                value={option}
                                onChange={(e) => setOption(e.target.value, index)}
                                placeholder="Enter Option"
                                style={styles.input}
                            />
                        ))
                    }

                    {/* add another option field */}
                    <button type="button" style={styles.button} onClick={addNewOptionField}>Add Another Option</button>

                    {error ? (<p style={styles.error}>{error}</p>) :
                    (success && <p style={styles.success}>{success}</p>)}
                    <button type="submit" style={styles.button}>Add Question to Database</button>
                </form>
            </div>
        </Modal>
    ) : null;
}

export default AddQuestion