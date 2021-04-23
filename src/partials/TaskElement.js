import React from 'react';
import '../styles/TaskElement.css';

class TaskElement extends React.Component {

  checkboxHandler = () => {
    this.props.makeCompleted(this.props.id)
  }


  render() {
    return (
      <>
        <li
          className={(this.props.isCompleted && 'completed') || 'uncompleted'}
        >
          <input type="checkbox" className="checkbox" onChange={this.checkboxHandler}/>
          {this.props.task}
        </li>
      </>
    );
  }
}

export default TaskElement;
