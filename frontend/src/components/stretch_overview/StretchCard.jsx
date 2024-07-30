import React from 'react';
import LikeDislikeButton from './LikeDislikeButton';
import { useQuery } from '@apollo/client';
import { GET_STRETCH } from '../../queries/stretchQueries';

/**
 * Unfinished stretch card element to represent 
 * stretches on the muscle group overview page and elsewhere.
 * Contains a LikeDislikeButton in the corner.
 * 
 * @param {StretchType} - stretch object
 *                                (this is just a string)
 * @returns {JSX.Element} div element containing info about a stretch,
 *                        an image, and a like/dislike button.
 */

const StretchCard = ({ stretch }) => {  // stretch object
    //const { loading, error, data } = useQuery(GET_STRETCH, {
    //    variables: {_id: stretchID}
    //});
//
    //if (loading) return <p>Loading...</p>;// <Spinner />; // TODO: improve
    //if (error) return <p>Something went wrong</p>;
//
    //const stretch = data.stretch;

    const styles = {
        card: {
            position: "relative",
            display: "grid",
            gridTemplateRows: "1fr auto",
            gridTemplateColumns: "auto 1fr",
            width: "469px",
            height: "293px",
            margin: "25px",
        },
        button: {
            display: "flex",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: "0",
            right: "0",
            zIndex: "1",
        },
        displayArea: {
            gridRow: "2",
            gridColumn: "1",
            position: "relative",
            bottom: "0",
            left: "0",
            display: "grid",
            gridTemplateRows: "auto 1fr",
            gridTemplateColumns: "auto auto",
            borderRadius: "25px",
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
            gridColumn: "2",
            width: "234px",
            height: "293px",
            fitContent: "cover",
            borderRadius: "25px"
        }
    }

  return (
    <div className="stretch-card" style={styles.card}>
        <div style={styles.button}>
            <LikeDislikeButton />
        </div>
        <div style={styles.displayArea}>
            <h4 style={styles.title}>{stretch.title}</h4>       {/* Title */}
            <p style={styles.text}>{stretch.description}</p>    {/* Text */}
            <img style={styles.image} src={stretch.imageURL} /> {/* Image */}
        </div>
    </div>
  )
}

export default StretchCard