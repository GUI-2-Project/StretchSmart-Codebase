import React from 'react'


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
            background: "#d9d9d9"
        }
    }

  return (
    <footer style={styles.footer}>
        {/* TODO: Add copyright info */}
    </footer>
  )
}

export default Footer
