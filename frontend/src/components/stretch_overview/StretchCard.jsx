import React, { useState, useContext } from 'react';
import LikeDislikeButton from './LikeDislikeButton';
import { useQuery, useMutation } from '@apollo/client';
import StretchDetails from './StretchDetails';
import { UPDATE_USER } from '../../mutations/userMutations';
import { UserContext } from '../ContentWrapper';

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

    const [isStretchDetailsOpen, setIsStretchDetailsOpen] = useState(false);
    const openStretchDetailsModal = () => setIsStretchDetailsOpen(true);
    const closeStretchDetailsModal = () => setIsStretchDetailsOpen(false);
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [updateUser] = useMutation(UPDATE_USER);

    const handlePreference = (preference) => {
        let likedStretchIDs = currentUser.likedStretchIDs;
        let dislikedStretchIDs = currentUser.dislikedStretchIDs;

        console.log("s:" + stretch._id);

        // update user preference for stretch
        switch (preference) {
            case "like":
                console.log("bliked: " + likedStretchIDs);
                likedStretchIDs.push(stretch._id);
                console.log("aliked: " + likedStretchIDs);
                dislikedStretchIDs = dislikedStretchIDs.filter(id => id !== stretch._id);
                break;
            case "dislike":
                dislikedStretchIDs.push(stretch._id);
                likedStretchIDs = likedStretchIDs.filter(id => id !== stretch._id);
                break;
            case "neutral":
                likedStretchIDs = likedStretchIDs.filter(id => id !== stretch._id);
                dislikedStretchIDs = dislikedStretchIDs.filter(id => id !== stretch._id);
            default:
                // do nothing :)
        }

        async function updateAndRefreshUser() {
            return await updateUser({
                variables: {
                    _id: currentUser._id,
                    likedStretchIDs: likedStretchIDs,
                    dislikedStretchIDs: dislikedStretchIDs
                }
            });
        }
        updateAndRefreshUser().then((data) => {
            // Resetting the current user has bizarre side effects
            // I did not have time to resolve.
            // Disabled for now.
            //setCurrentUser(data.data.updateUser);
        }).catch((error) => {console.log(error)});
    }

    const styles = {
        card: {
            flexShrink: "0",
            position: "relative",
            display: "grid",
            gridTemplateRows: "1fr auto",
            gridTemplateColumns: "auto 1fr",
            width: "469px",
            height: "293px",
            margin: "auto",
        },
        button: {
            display: "flex",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: "0",
            right: "0",
            zIndex: "1",
            cursor: "pointer"
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
            backgroundColor: "#75816B",
            cursor: "pointer",
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
            borderRadius: "25px"
        }
    }

  return (
    <>
        <div className="stretch-card" style={styles.card}>
            <div style={styles.button}>
                <LikeDislikeButton clickHandler={handlePreference} stretch={stretch} />
            </div>
            <div style={styles.displayArea} onClick={openStretchDetailsModal}>
                <h4 style={styles.title}>{stretch.title}</h4>      
                <p style={styles.text}>{stretch.description}</p>   
                <img style={styles.image} src={stretch.imageURL} />
            </div>
        </div>
        <StretchDetails isOpen={isStretchDetailsOpen} onClose={closeStretchDetailsModal} stretch={stretch}/>
    </>
  )
}

export default StretchCard