import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_MUSCLE_GROUP } from '../../mutations/muscleGroupMutations'
import { GET_MUSCLE_GROUPS } from '../../queries/muscleGroupQueries'
import Modal from '../Modal'


const ModifyMuscleGroup = ({ isOpen, onClose, muscleGroup }) => {
    const [name, setName] = useState(muscleGroup.name);
    const [imageFile, setImageFile] = useState(null);
    const [stretchIDs, setStretchIDs] = useState(muscleGroup.stretches.map((stretch) => {return stretch._id})); // pre-populate with empty string
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const addNewStretchField = () => {
        const tmpStretchIDs = [...stretchIDs];
        tmpStretchIDs.push('');
        setStretchIDs(tmpStretchIDs);
    }

    const setStretchID = (value, index) => {
        const tmpStretchIDs = [...stretchIDs];
        tmpStretchIDs[index] =  value;
        setStretchIDs(tmpStretchIDs);
    }

    const [updateMuscleGroup] = useMutation(UPDATE_MUSCLE_GROUP, {
        variables: { _id: muscleGroup._id, name: name, imageFile: imageFile, stretchIds: stretchIDs },
        refetchQueries: [{ query: GET_MUSCLE_GROUPS }]
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            updateMuscleGroup(name, imageFile, stretchIDs);
            setSuccess('Muscle Group Added Successfully!');
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
                <h2 style={styles.title}>Modify a Muscle Group</h2>
                <form style={styles.form} onSubmit={handleSubmit}>
                    
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter A Name for the Muscle Group"
                        style={styles.input}
                    />

                    {/* HANDLE IMAGE UPLOAD */}
                    <div style={styles.input}>
                        <label htmlFor="image">Replace Current Image:</label>
                        <input
                            type="file"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    </div>

                    {/* map over stretchIDs and create input fields */}
                    {
                        stretchIDs.map((stretch, index) => (
                            <input
                            key={index}
                            type="text"
                            value={stretch}
                            onChange={(e) => setStretchID(e.target.value, index)}
                            placeholder="Enter A Stretch ID"
                            style={styles.input}
                            />
                        ))
                    }

                    {/* add another option field */}
                    <button type="button" style={styles.button} onClick={addNewStretchField}>Add Another Stretch ID</button>

                    {error ? (<p style={styles.error}>{error}</p>) :
                    (success && <p style={styles.success}>{success}</p>)}
                    <button type="submit" style={styles.button}>Update Muscle Group</button>
                </form>
            </div>
        </Modal>
    ) : null;
}

export default ModifyMuscleGroup