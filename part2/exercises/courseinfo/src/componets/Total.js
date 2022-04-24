
import React from "react"

const Total = ({ parts }) => {

    let total = 0
    for (let i = 0; i < parts.length; i++) {
         const part = parts[i];
         total += part.exercises
    }

    return (
        <div>
            <p>
                <strong>total of {total} exercises</strong>
            </p>
        </div>
    )
}

export default Total