const Header = (props) => {
  return (
    <h1>
      {props.name}
    </h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        {props.name1}, {props.ex1} exercises
      </p>

      <p>
        {props.name2}, {props.ex2} exercises
      </p>

      <p>
        {props.name3}, {props.ex3} exercises
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Total number of exercises: {props.ex1 + props.ex2 + props.ex3}
    </p>
  )
}

const App = () => {
  const course = "Half stack application development"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />

      <Content name1={part1} name2={part2} name3={part3} ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </div>
  )

}

export default App
