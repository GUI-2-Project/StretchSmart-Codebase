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
        },
        content: {
          textAlign:'center'
        }
    }

  return (
    <footer style={styles.footer}>
        <div style={styles.content}>
                &copy; {new Date().getFullYear()} <a href='https://github.com/orgs/GUI-2-Project/people' target='_blank'>Stretch Smart</a>. All rights reserved.
        </div>
    </footer>
  )
}

export default Footer
