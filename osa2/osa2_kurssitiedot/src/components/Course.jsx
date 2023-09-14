import Header from './Header.jsx'
import Content from './Content.jsx'

const Course = ({ name, parts }) => {
    return (
        <div>
            <Header name={name} />
            <Content parts={parts} />
        </div>
    )
}

export default Course