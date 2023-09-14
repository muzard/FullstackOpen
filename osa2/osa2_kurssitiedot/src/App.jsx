import Course from './components/Course.jsx'

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
      <Course name={course.name} parts={course.parts} />
    </div>
  )

}

export default App
