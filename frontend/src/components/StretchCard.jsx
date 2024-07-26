import React from 'react'
import LikeDislikeButton from './LikeDislikeButton'

const StretchCard = (props) => {
    const styles = {
        card: {
            display: "grid",
            gridTemplateRows: "1fr auto",
            gridTemplateColumns: "auto 1fr",
            width: "494px",
            height: "318px",
            backgroundColor: "#e9e9e9"
        },
        button: {
            gridRow: "1",
            gridColumn: "2",
            zIndex: "999999"
        },
        displayArea: {
            gridRow: "2",
            gridColumn: "1",
            display: "grid",
            gridTemplateRows: "auto 1fr",
            gridTemplateColumns: "auto auto",
            borderRadius: "25px",
            width: "469px",
            height: "293px",
            backgroundColor: "#75816B"
        },
        title: {
            gridRow: "1",
            gridColumn: "1",
            padding: "25px",
            margin: "0"
        },
        text: {
            gridRow: "2",
            gridColumn: "1",
            padding: "25px"
        },
        image: {
            gridRow: "1 / -1",
            gridColumn: "2"
        }
    }

  return (
    <div className="stretch-card" style={styles.card}>
        <div style={styles.button}>
            <LikeDislikeButton />
        </div>
        <div style={styles.displayArea}>
            <h4 style={styles.title}>TITLE</h4>     {/* Title */}
            <p style={styles.text}>PARAGRAPH</p>    {/* Text */}
            <img style={styles.image} />            {/* Image */}
        </div>
    </div>
  )
}

export default StretchCard