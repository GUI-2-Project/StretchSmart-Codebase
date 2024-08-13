import React, { useState } from 'react'
import circle from '../../assets/circleFill.png'
import neutralIcon from '../../assets/neutralLike.png'
import likeIcon from '../../assets/like.png'
import dislikeIcon from '../../assets/dislike.png'
import { NetworkStatus } from '@apollo/client'
import { NoFragmentCyclesRule } from 'graphql'

/**
 * A small icon to "like" or "dislike"
 * 
 * @returns {JSX.Element} button element with an icon.
 */


// Pretend to set prefrerences
const preferences = {
  icons: [
    neutralIcon,
    likeIcon,
    dislikeIcon
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
preferences.cycleToNext = () => preferences.index = (preferences.index + 1) % 3;


const LikeDislikeButton = () => {
  
  const cyclePreference = () => {
    preferences.cycleToNext();
    setPreference(preferences.icon());
  }

  const [preference, setPreference] = useState(preferences.icon());
  
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
        <img style={styles.icon} src={preference}/>
    </div>
  )
}

export default LikeDislikeButton