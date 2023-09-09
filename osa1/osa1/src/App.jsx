const Header = (course) => {
  return (
    <h1>
      {course.name}
    </h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name}, {props.part.exercises} exercises
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.partArray[0]} />

      <Part part={props.partArray[1]} />

      <Part part={props.partArray[2]} />
    </div>
  )
}

const Total = (props) => {
  const totalExercises = props.partArray[0].exercises + props.partArray[1].exercises + props.partArray[2].exercises

  return (
    <p>
      Total exercises: {totalExercises}
    </p>
  )
}


const App = () => {
  const course = "Half stack application development"
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course} />

      <Content partArray={[part1, part2, part3]} />

      <Total partArray={[part1, part2, part3]} />
    </div>
  )

}

export default App
