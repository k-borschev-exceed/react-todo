import React from 'react';
import '../styles/Footer.css';

function Footer(props)  {
  const completeAll = (e) => {
    props.completeAll();
  };

  const deleteAll = (e) => {
    props.deleteAll();
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

  return(
      <>
        <div>
          <button className='footerBtn' onClick={completeAll}>
            complete all
          </button>
          <button className='footerBtn' onClick={deleteAll}>
            delete all
          </button>
        </div>
        <ul className='menu'>
          <li className='menuElement' onClick={showAll}>
            All ({props.tasksCounter[0]})
          </li>
          <li className='menuElement' onClick={showActive}>
            Active ({props.tasksCounter[2]})
          </li>
          <li className='menuElement' onClick={showCompleted}>
            Completed({props.tasksCounter[1]})
          </li>
        </ul>
      </>
  );
};

export default Footer;
