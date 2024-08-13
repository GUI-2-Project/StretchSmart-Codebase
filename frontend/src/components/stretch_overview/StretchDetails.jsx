import React from 'react'
import Modal from '../Modal'
import StretchStepParser from './StretchStepParser';

const StretchDetails = ({ isOpen, onClose, stretch }) => {

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
            maxWidth: '800px',
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
        },
        image: {
            width: '100%',
            borderRadius: '10px',
            margin: 'auto',
            padding: '20px'
        }
    };

    return isOpen ? (
        <Modal>
            <div style={styles.formContainer}>
                <button style={styles.closeButton} onClick={onClose}>&times;</button>
                <h2 style={styles.title}>{stretch.title}</h2>
                <div style={styles.form}>
                    <p>{stretch.description}</p>
                    <img src={stretch.imageURL} style={styles.image}/>
                    <StretchStepParser stretchInstructions={stretch.instructions}/>
                </div>
            </div>
        </Modal>
    ) : null;
}

export default StretchDetails