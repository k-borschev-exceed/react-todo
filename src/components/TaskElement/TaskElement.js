import React, { useState } from 'react';
import './TaskElement.css';
export default function TaskElement({
  id,
  isCompleted,
  deleteTask,
  changeCompleteness,
  changeTask,
  task,
}) {
  const [inputCondition, setInputCondition] = useState(true);
  const [newValue, setNewValue] = useState('');

  const inputHandler = (e) => setNewValue(e.currentTarget.value);

  const checkboxHandler = () => changeCompleteness(id, !isCompleted);

  const submitHandler = (event) => {
    if (event.type === 'blur' || event.key === 'Enter') {
      changeTask(newValue, id);
      setInputCondition(true);
    }
  };

  const deleteTaskF = () => deleteTask(id);

  const changeCondition = () => setInputCondition(false);

  return (
    <>
      <li className='taskElement'>
        {inputCondition ? (
          <>
            <input
              type='checkbox'
              className='checkbox'
              onChange={checkboxHandler}
              checked={isCompleted}
            />
            <div id='inputArea' onDoubleClick={changeCondition}>
              <p
                className={
                  isCompleted ? 'completed taskvalue' : 'uncompleted taskvalue'
                }
              >
                {task}
              </p>
              <button className={'delete'} onClick={deleteTaskF}>
                ×
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              className='valueChanger'
              value={newValue || task}
              onChange={inputHandler}
              onKeyDown={submitHandler}
              onBlur={submitHandler}
              type='text'
            />
          </>
        )}
      </li>
    </>
  );
}
