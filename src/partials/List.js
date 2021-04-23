import React from 'react';
import TaskElement from './TaskElement';
import '../styles/List.css';

class List extends React.Component {

  renderTasks() {
    let tasksTemplate = null;
    console.log(this.props, 'outside map')

    if (this.props.tasks.length) {
      tasksTemplate = this.props.tasks.map((item) => {       
        console.log('item inside list')
        console.log(item)
        console.log(this.props, 'inside map')
        return <TaskElement task={item.task} key={item.id} id={item.id} isCompleted={item.isCompleted} makeCompleted={this.props.makeCompleted}/>;
      });
    } 
    else {
      tasksTemplate = <p>No tasks</p>;
    }

    return tasksTemplate;
  };

  render() {
    console.log('inside list.js render method ');
    console.log(this.props.tasks);
    return (
      <>
        <hr></hr>
        <ul>{this.renderTasks()}</ul>
      </>
    );
  }
}

export default List;
