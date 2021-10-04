import React from "react";

const Header = (props) => {
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(course =>
                <Part key={course.id} part={course} />
            )}
        </div>
    )
}

const Total = ({ course }) => {
    console.log("wow", course.parts)
    const total = course.parts.reduce((sum, currentValue) => {
        sum += currentValue.exercises
        return sum
    }, 0)

    return (
        <div>
            <p><b>Number of exercises {total}</b></p>
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <div>
            <p>
                {part.name} {part.exercises}
            </p>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course