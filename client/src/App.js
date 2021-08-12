import './App.css';
import React, { useState, useEffect } from 'react'
import TasksDiv from './components/TasksDiv/TasksDiv'
import Input from './components/Input/Input'
import BottomPanel from "./components/BottomPanel/BottomPanel"
import { v4 as uuidv4 } from 'uuid'
import { randomColor } from 'randomcolor'
import Draggable from 'react-draggable'

function App() {
  // const [data, setData] = React.useState(null);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  const [itemTask, setItemTask] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const [taskIsComplete, setTaskIsComplete] = useState('All')

  const [filteredItems, setFilteredItems] = useState([...items])

  useEffect(() => {
    if (taskIsComplete === 'Completed') {
      const filteredTasks = items.filter((event) => event.isComplete === true)
      setFilteredItems(filteredTasks);
      return
    } else if (taskIsComplete === 'Active') {
      const filteredTasks = items.filter((event) => event.isComplete === false)
      setFilteredItems(filteredTasks);
      return
    }
    setFilteredItems(items)
  }, [items, taskIsComplete])

  const addArrElement = () => {
    if (itemTask.trim() === '') {
      alert('Error')
      setItemTask('')
    } else {
      const newItem = {
        id: uuidv4(),
        value: itemTask,
        isComplete: false,
        color: randomColor({
          luminosity: 'light'
        }),
      }
      setItems((items) => [...items, newItem])
      setItemTask('')
    }
  }

  const handleChange = (event) => {
    setItemTask(event.target.value)
  }

  const deleteItem = (id) => {
    const allTask = items.filter((event) => id !== event.id)
    setItems(allTask)
  }

  const changeComplete = (id, event) => {
    const allTask = items.map((event) => {
      if (id === event.id) {
        return { ...event, isComplete: !event.isComplete }
      } else {
        return event
      }
    })
    setItems(allTask)
  }

  const ClearAllTasks = () => {
    setItems([])
    setFilteredItems([])
  }

  const clearFinishedTasks = () => {
    const filteredTasks = items.filter((event) => event.isComplete === false)
    setItems(filteredTasks);
  }

  // const allFinishedTasks = () => {
  //   const allTask = items.map((event) => {
  //     return { ...event, isComplete: true }
  //   })
  //   setItems(allTask)
  // }


  const updatePos = (data, index) => {
    let newArray = [...items]
    newArray[index].defaultPos = { x: data.x, y: data.y }
    setItems(newArray)
  }

  const changeValue = (item) => {
    const allTask = items.map((event) => {
      if (item.id === event.id) {
        return { ...event, value: item.value }
      } else {
        return event
      }
    })
    setItems(allTask)
  }

  return (
    <div className='content'>
      <h1>
        <span>T</span><span>O</span><span>D</span><span>O</span>
      </h1>
      <header className="App-header">
        {/* <p>
          {!data ? "Loading..." : data}
        </p> */}
      </header>
      <div className='bottom-panel'>
        <BottomPanel
          ClearAllTasks={ClearAllTasks}
          setTaskIsComplete={setTaskIsComplete}
          clearFinishedTasks={clearFinishedTasks}
        // allFinishedTasks={allFinishedTasks}
        />
      </div>
      <div className='header'>
        <Input
          value={itemTask}
          handleChange={handleChange}
          addArrElement={addArrElement}
          itemTask={itemTask}
        />
      </div>

      <div className='task-divs'>
        {filteredItems.map((item, index) => (
          <Draggable
            key={index}
            defaultPosition={item.defaultPos}
            onStop={(_, data) => {
              updatePos(data, index)
            }}
          >
            <div className='todo__item' style={{ backgroundColor: item.color }}>
              <TasksDiv
                item={item}
                key={item.id}
                deleteItem={deleteItem}
                changeComplete={changeComplete}
                changeValue={changeValue}
              />
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}

export default App;
