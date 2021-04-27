import React from 'react';
import TaskElement from './TaskElement';
import '../styles/List.css';

function List(props) {
  const renderHandler = () => {
    let tasksTemplate = null;

    if (props.tasks.length) {
      tasksTemplate = props.tasks.map((item) => {
        if (props.showCondition === 'all') {
          return (
            <TaskElement
              task={item.task}
              key={item.id}
              id={item.id}
              isCompleted={item.isCompleted}
              changeCompleteness={props.changeCompleteness}
              deleteTask={props.deleteTask}
              changeTask={props.changeTask}
            />
          );
        } else if (props.showCondition === 'uncompleted' && !item.isCompleted) {
          return (
            <TaskElement
              task={item.task}
              key={item.id}
              id={item.id}
              isCompleted={item.isCompleted}
              changeCompleteness={props.changeCompleteness}
              deleteTask={props.deleteTask}
              changeTask={props.changeTask}
            />
          );
        } else if (props.showCondition === 'completed' && item.isCompleted) {
          return (
            <TaskElement
              task={item.task}
              key={item.id}
              id={item.id}
              isCompleted={item.isCompleted}
              changeCompleteness={props.changeCompleteness}
              deleteTask={props.deleteTask}
              changeTask={props.changeTask}
            />
          );
        }
        return null;
      });
    } else {
      tasksTemplate = <p>No tasks</p>;
    }

    return tasksTemplate;
  };

  return (
    <>
      <hr></hr>
      <ul>{renderHandler()}</ul>
    </>
  );
}

export default List;
