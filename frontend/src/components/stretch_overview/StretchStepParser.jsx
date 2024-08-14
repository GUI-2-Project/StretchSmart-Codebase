import React from 'react'

/* This component is used to parse the stretch instructions into a list of steps.
 * It is far easier to store them as a simple string */

const StretchStepParser = ({ stretchInstructions }) => {
    const steps = stretchInstructions.split(';');

    // remove last element if it is empty
    if (stretchInstructions.charAt(stretchInstructions.length - 1) === ';') {
        steps.pop();
    }

    return (
        <ol>
            {steps.map((step, index) => {
                return <li key={index}>{ step }</li>
            })}
        </ol>
    )
}

export default StretchStepParser