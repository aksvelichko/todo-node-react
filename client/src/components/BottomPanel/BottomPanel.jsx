import './BottomPanel.css'

function BottomPanel({ ClearAllTasks, clearFinishedTasks, setTaskIsComplete }) {

  return (
    <div>
      <button
        className='Completed'
        onClick={() => setTaskIsComplete('Completed')}>
        Completed
      </button>
      <button
        className='Active'
        onClick={() => setTaskIsComplete('Active')}>
        Active
      </button>
      <button
        onClick={() => setTaskIsComplete('All')}
        className='All'>
        All
      </button>
      <button
        className='ClearTask'
        onClick={() => ClearAllTasks()}>
        Clear all
      </button>
      <button
        className='Clear'
        onClick={() => clearFinishedTasks()}>
        Clear completed
      </button>
      {/* <button 
        onClick={() => props.allFinishedTasks()}>Make all tasks completed</button> */}
    </div>
  )
}

export default BottomPanel