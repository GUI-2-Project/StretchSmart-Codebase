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
            background: "#d9d9d9",
            minHeight: "50px"   //TODO: revisit
        }
    }

  return (
    <footer style={styles.footer}>
        {/* TODO: Add copyright info */}
    </footer>
  )
}

export default Footer
