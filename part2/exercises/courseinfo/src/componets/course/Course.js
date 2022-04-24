import React from "react"
import Header from "./header/Header"
import Content from "./content/Content"
import Total from "./total/Total"

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course