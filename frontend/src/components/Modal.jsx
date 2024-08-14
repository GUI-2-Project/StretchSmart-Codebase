import React from "react";

// Modal component to display content in a modal
// used in various components

const Modal = ({ children }) => {
    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        },
        content: {
            padding: '20px',
            width: '100%',
            maxWidth: '500px'
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
