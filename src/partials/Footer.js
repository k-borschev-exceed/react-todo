import React from 'react';
import '../styles/Footer.css';

function Footer(props) {
  const clearCompleted = (e) => {
    props.clearCompleted();
    console.log(props.tasksCounter[1], 'TEST AFTER');
  };

  const showActive = (e) => {
    props.showActive();
  };

  const showAll = (e) => {
    props.showAll();
  };

  const showCompleted = (e) => {
    props.showCompleted();
  };

  return (
    <div id='footer'>
      <p className='itemsLeft'>{props.tasksCounter[2]} items left</p>
      <ul className='menu'>
        <li
          className={
            'menuElement ' + (props.showCondition === 'all' ? 'active' : 'n')
          }
          onClick={showAll}
        >
          All
        </li>
        <li
          className={
            'menuElement ' +
            (props.showCondition === 'uncompleted' ? 'active' : 'n')
          }
          onClick={showActive}
        >
          Active
        </li>
        <li
          className={
            'menuElement ' +
            (props.showCondition === 'completed' ? 'active' : 'n')
          }
          onClick={showCompleted}
        >
          Completed
        </li>
      </ul>
      <button
        className={'footerBtn ' + (!props.tasksCounter[1] ? 'hidden' : '')}
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </div>
  );
}

export default Footer;
