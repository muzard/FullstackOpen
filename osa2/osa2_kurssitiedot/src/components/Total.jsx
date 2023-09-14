const Total = ({ parts }) => {
    let exercises = 0
    parts.map(part => exercises += part.exercises)
    
    return (
        <h3>total of {exercises} exercises</h3>
    )
}

export default Total