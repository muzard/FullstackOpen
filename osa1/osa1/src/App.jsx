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
  const course = {
    name: "Half stack application development",
    parts: [
    {
    name: 'Fundamentals of React',
    exercises: 10
  },
    {
    name: 'Using props to pass data',
    exercises: 7
  },
    {
    name: 'State of a component',
    exercises: 14
  }
]}
  return (
    <div>
      <Header name={course.name} />

      <Content partArray={course.parts} />

      <Total partArray={course.parts} />
    </div>
  )

}

export default App
