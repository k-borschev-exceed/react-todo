import React from 'react';
import '../styles/TaskElement.css';

class TaskElement extends React.Component {
  state = {
    condition: true,
    newValue: '',
  };

  inputHandler = (e) => {
    this.setState({ newValue: e.currentTarget.value });
  };

  checkboxHandler = () => {
    this.props.changeCompleteness(this.props.id, !this.props.isCompleted);
  };

  submitHandler = (event) => {
    if (event.key === 'Enter') {
      this.props.changeTask(this.state.newValue, this.props.id);
      this.setState({ condition: true });
    }
  };

  deleteTask = () => {
    this.props.deleteTask(this.props.id);
  };

  changeCondition = () => {
    this.setState({ condition: false });
  };

  taskElemHandler = (condition) => {
    if (condition) {
      return (
        <>
          <input
            type='checkbox'
            className='checkbox'
            onChange={this.checkboxHandler}
            checked={this.props.isCompleted}
          />
          <p
            onDoubleClick={this.changeCondition}
            className={(this.props.isCompleted && 'completed') || 'uncompleted'}
          >
            {this.props.task}
          </p>
          <button
            className={(this.props.isCompleted && 'completed') || 'uncompleted'}
            onClick={this.deleteTask}
          >
            {' '}
            delete{' '}
          </button>
        </>
      );
    } else {
      return (
        <>
          <input
            value={this.state.newValue}
            onChange={this.inputHandler}
            onKeyDown={this.submitHandler}
            type='text'
          />
        </>
      );
    }
  };

  render() {
    return (
      <>
        <li>{this.taskElemHandler(this.state.condition)}</li>
      </>
    );
  }
}

export default TaskElement;
