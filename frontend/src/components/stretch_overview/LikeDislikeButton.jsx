import React, { useState, useEffect, useContext } from 'react'
import circle from '../../assets/circleFill.png'
import neutralIcon from '../../assets/neutralLike.png'
import likeIcon from '../../assets/like.png'
import dislikeIcon from '../../assets/dislike.png'
import { updateCurrentUser } from 'firebase/auth'
import { UserContext } from '../ContentWrapper';

/**
 * A small icon to "like" or "dislike"
 * 
 * @returns {JSX.Element} button element with an icon.
 */

// Preferences object to store the current preference about a given stretch
const preferences = {
  icons: [
    neutralIcon,
    likeIcon,
    dislikeIcon
  ],
  states: [
    "neutral",
    "like",
    "dislike"
  ],
  index: 0,
  current: () => { null },
  cycleToNext: () => {
    null
  }
};





// Can't assign these during the object declaration
// I hate JS
preferences.icon = () => preferences.icons[preferences.index];
preferences.state = () => preferences.states[preferences.index];
preferences.cycleToNext = () => preferences.index = ((preferences.index + 1) % 3);

const LikeDislikeButton = ({ clickHandler, stretch }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const init = () => {
    if (currentUser.likedStretchIDs.includes(stretch._id)) {
      return 1;
    } else if (currentUser.dislikedStretchIDs.includes(stretch._id)) {
      return 2;
    } else {
      return 0;
    }
  }
  const [index, setIndex] = useState(init());
  const icons = [neutralIcon, likeIcon, dislikeIcon, neutralIcon, ];
  const states = ["neutral", "like", "dislike"];
  const [preferenceState, setPreferenceState] = useState(preferences.state());
  const [preferenceIcon, setPreferenceIcon] = useState(preferences.icons[index]);

  console.log("=============");
  console.log(stretch._id);
  //console.log("index: " + index);
  //console.log(currentUser.likedStretchIDs.includes(stretch._id));
  //console.log(currentUser.dislikedStretchIDs.includes(stretch._id));

  const cyclePreference = () => {
    setIndex((index + 1) % 3);
    console.log((3 + 1) % 3);
    console.log("index: " + index);
    setPreferenceIcon(icons[index]);
    console.log("icon: " + icons[index]);
    setPreferenceState(states[index]);
    console.log("state: " + states[index]);
    clickHandler(states[index]);
  }


    const styles = {
        button: {
          display: "flex",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          width: "50px",
          height: "50px"
        },
        circle: {
          position: "absolute",
          opacity: "0.25",
          width: "50px",
          height: "50px"
        },
        icon: {
          position: "absolute",
          opacity: "0.5",
          width: "35px",
          height: "35px"
        }
    }

  return (
    <div style={styles.button} onClick={cyclePreference}>
        <img style={styles.circle} src={circle}/>
        <img key={stretch._id} style={styles.icon} src={icons[index]}/>
    </div>
  )
}

export default LikeDislikeButton