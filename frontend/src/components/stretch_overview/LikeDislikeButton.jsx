import React from 'react'
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

const icons = [
  neutralIcon,
  likeIcon,
  dislikeIcon
]


const LikeDislikeButton = () => {
  
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
    <div style={styles.button}>
        <img style={styles.circle} src={circle}/>
        <img style={styles.icon} src={icons[0]}/>
    </div>
  )
}

export default LikeDislikeButton


//   const handleAreaClick = (muscle) => {
//     onMuscleSelect(muscle);
// onClick={(e) => {
//   e.preventDefault();
//   handleAreaClick('chest');
// }