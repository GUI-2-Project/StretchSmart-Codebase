import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_STRETCH } from '../../mutations/stretchMutations';
import { GET_STRETCHES } from '../../queries/stretchQueries';
import Modal from '../Modal'


const ModifyStretch = ({ isOpen, onClose, stretch }) => {
    const [title, setTitle] = useState(stretch.title);
    const [description, setDescription] = useState(stretch.description);
    const [goodFor, setGoodFor] = useState(stretch.goodFor); 
    const [badFor, setBadFor] = useState(stretch.badFor);
    const [imageFile, setImageFile] = useState(null);
    const [instructions, setInstructions] = useState(stretch.instructions);
    const [durationSeconds, setDurationSeconds] = useState(undefined);
    const [reps, setReps] = useState(undefined);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const addNewGoodForField = () => {
        const tmpGoodFor = [...goodFor];
        tmpGoodFor.push('');
        setGoodFor(tmpGoodFor);
    }

    const addNewBadForField = () => {
        const tmpBadFor = [...badFor];
        tmpBadFor.push('');
        setBadFor(tmpBadFor);
    }

    const setGoodForElement = (value, index) => {
        const tmpGoodFor = [...goodFor];
        tmpGoodFor[index] =  value;
        setGoodFor(tmpGoodFor);
    }

    const setBadForElement = (value, index) => {
        const tmpBadFor = [...badFor];
        tmpBadFor[index] =  value;
        setBadFor(tmpBadFor);
    }

    const [updateStretch] = useMutation(UPDATE_STRETCH, {
        variables: { _id: stretch._id, 
            title: title,
            description: description,
            goodFor: goodFor,
            badFor: badFor,
            durationSeconds: Number(durationSeconds),
            reps: Number(reps),
            imageFile: imageFile,
            instructions: instructions },
        refetchQueries: [{ query: GET_STRETCHES }]
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isNaN(durationSeconds) && durationSeconds !== undefined) {
            return alert('Duration must be a number');
        }

        if (isNaN(reps) && reps !== undefined) {
            return alert('Reps must be a number');
        }

        try {
            updateStretch(
                title,
                description,
                goodFor,
                badFor,
                imageFile,
                Number(durationSeconds),
                Number(reps),
                instructions
            );
            setSuccess('Stretch Updated Successfully!');
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
                <h2 style={styles.title}>Modify a Stretch</h2>
                <form style={styles.form} onSubmit={handleSubmit}>
                    
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter A Title for the Stretch"
                        style={styles.input}
                    />

                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter A Description for the Stretch"
                        style={styles.input}
                    />

                    {/* map over goodFor and create input filds */}
                    {
                        goodFor.map((val, index) => (
                            <input
                                key={index}
                                type="text"
                                value={val}
                                onChange={(e) => setGoodForElement(e.target.value, index)}
                                placeholder="Good For"
                                style={styles.input}
                            />
                        ))
                    }

                    {/* map over badFor and create input filds */}
                    {
                        badFor.map((val, index) => (
                            <input
                                key={index}
                                type="text"
                                value={val}
                                onChange={(e) => setBadForElement(e.target.value, index)}
                                placeholder="Bad For"
                                style={styles.input}
                            />
                        ))
                    }

                    {/* HANDLE IMAGE UPLOAD */}
                    <div style={styles.input}>
                        <label htmlFor="image">Replace Current Image:</label>
                        <input
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    </div>

                    <input
                        type="text"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="Enter Instructions for the Stretch"
                        style={styles.input}
                    />

                    <input
                        type="number"
                        value={durationSeconds}
                        onChange={(e) => setDurationSeconds(e.target.value)}
                        placeholder="Enter Duration for the Stretch"
                        style={styles.input}
                    />

                    <input
                        type="number"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                        placeholder="Enter The Number of Reps for the Stretch"
                        style={styles.input}
                    />

                    {/* add another good for field */}
                    <button type="button" style={styles.button} onClick={addNewGoodForField}>Add Another Good-For Field</button>

                    {/* add another bad for field */}
                    <button type="button" style={styles.button} onClick={addNewBadForField}>Add Another Bad-For Field</button>

                    {error ? (<p style={styles.error}>{error}</p>) :
                    (success && <p style={styles.success}>{success}</p>)}
                    <button type="submit" style={styles.button}>Update Stretch</button>
                </form>
            </div>
        </Modal>
    ) : null;
}

export default ModifyStretch