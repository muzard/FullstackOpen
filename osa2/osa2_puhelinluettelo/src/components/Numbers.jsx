import Persons from './Numbers_components/Persons.jsx'

const Numbers = ({ persons }) => {
    return (
        <div>
            <h2>Numbers</h2>
            <Persons persons={persons} />
        </div>
    )
}

export default Numbers