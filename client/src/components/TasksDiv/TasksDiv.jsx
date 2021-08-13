import React, { useState } from 'react'
import './TaskDiv.css'

function TasksDiv({ item, deleteItem, changeComplete, changeValue }) {
 
    const [editMode, setEditMode] = useState(false)
    const [title, setValueInput] = useState(item.value)
    // console.log(`item`, item)
    let spanClassName = ''
    let completeClassName
    if (item.isComplete) {
        spanClassName = 'text-complete'
        completeClassName = 'complete'
    } else {
        spanClassName = ''
        completeClassName = ''
    }

    const makeInput = () => {
        if (editMode) {
            item.value = title;
            changeValue(item)
            setEditMode(false)
        } else {
            setEditMode(true)
        }
    }

    const setInputValueFunc = (event) => {
        setValueInput(event.target.value)
    }

    return (
        <div className='task-div' style={{ backgroundColor: item.color }}>
            <div>
                <button
                    className={'complete-div ' + completeClassName}
                    onClick={(event) => changeComplete(item.id, event)}
                >
                    {item.isComplete === true && '✓'}

                </button>
            </div>
            {editMode === true && (
                <input onChange={setInputValueFunc} onDoubleClick={makeInput}></input>
            )}
            {editMode === false && (
                <span className={'text-div ' + spanClassName} onDoubleClick={makeInput}>
                    {!item.title ? "Loading..." : item.title}
                </span>
            )}
            <button
                className='delete-div'
                style={{ backgroundColor: item.color }}
                onClick={() => deleteItem(item.id)}
            >
                X
            </button>
        </div>
    )
}

export default TasksDiv