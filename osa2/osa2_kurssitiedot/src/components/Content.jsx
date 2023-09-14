import Parts from './Parts.jsx'
import Total from './Total.jsx'

const Content = ({ parts }) => {
    return (
        <div>
            <Parts parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default Content