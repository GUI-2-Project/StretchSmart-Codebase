import React from 'react';

/**
 * Footer component to be used site-wide.
 * 
 * @returns {JSX.Element} A rendered footer element.
 * @example
 * // Render footer
 * <Footer />
 */

const Footer = () => {
    const styles = {
        footer: {
            minHeight: "50px",   //TODO: revisit
            background: "#d9d9d9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            width: "100%",
            bottom: 0
        },
        text: {
            color: "#333",
            fontSize: "14px"
        }
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.text}>
                &copy; {new Date().getFullYear()} <a href='https://github.com/orgs/GUI-2-Project/people' target='_blank'>Stretch Smart</a>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

