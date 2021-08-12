import './Input.css'

function Input({ handleChange, itemTask, addArrElement }) {

    return (
        <div className='header'>
            <input
                className='input'
                placeholder='Enter...'
                type='text'
                onChange={handleChange}
                value={itemTask}
            />
            <button
                className='buttonAdd'
                onClick={addArrElement}>
                add
            </button>
        </div>
    )
}

export default Input