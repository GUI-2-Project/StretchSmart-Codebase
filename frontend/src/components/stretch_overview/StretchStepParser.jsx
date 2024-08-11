import React from 'react'

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