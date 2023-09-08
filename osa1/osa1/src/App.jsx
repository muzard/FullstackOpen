const Header = (props) => {
  return (
    <h1>
      {props.name}
    </h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name}, {props.ex} exercises
    </p>
  )
}

const Content = ({p1, ex1, p2, ex2, p3, ex3}) => {
  return (
    <div>
      <Part name={p1} ex={ex1} />

      <Part name={p2} ex={ex2} />

      <Part name={p3} ex={ex3} />
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

      <Content p1={part1} p2={part2} p3={part3} ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </div>
  )

}

export default App
