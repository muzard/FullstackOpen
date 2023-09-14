const Total = ({ parts }) => {
    const exercises = parts.reduce( (prev, cur) => {
        return prev + cur.exercises
    }, 0)
    
    return (
        <h3>total of {exercises} exercises</h3>
    )
}

export default Total