import Course from './Course.jsx'

const Courses = ({ array }) => {
    return (
        <div>
            {array.map(course => 
                <Course key={course.id}  name={course.name} parts={course.parts} />
            )}
        </div>
    )
}

export default Courses