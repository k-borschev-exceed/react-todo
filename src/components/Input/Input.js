import React, { useState } from 'react';
import './Input.css';

export default function Input({
  updateTasks,
  completeAll,
  isNotEmpty,
  isAllCompleted,
}) {
  const [task, setTask] = useState('');

  const inputHandler = (e) => {
    setTask(e.currentTarget.value);
  };

  const onBtnClickHandler = (e) => {
    e.preventDefault();
    if (task.trim()) updateTasks(task, +new Date(), false);
    setTask('');
  };

  return (
    <div id='input'>
      <button
        id='completeAllBtn'
        onClick={completeAll}
        className={
          isAllCompleted && isNotEmpty
            ? 'completed '
            : isNotEmpty
            ? ''
            : 'empty'
        }
      >
        &nbsp;
      </button>
      <form onSubmit={onBtnClickHandler}>
        <input
          type='text'
          placeholder='What needs to be done'
          value={task}
          onChange={inputHandler}
        />
      </form>
    </div>
  );
}
