
import React from "react"

const Total = ({ parts }) => {

    const total = parts
        .map(part => part.exercises)
        .reduce((s, p) => s + p)

    return (
        <div>
            <p>
                <strong>total of {total} exercises</strong>
            </p>
        </div>
    )
}

export default Total