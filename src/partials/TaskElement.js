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
    if (event.type === 'blur' || event.key === 'Enter') {
      this.props.changeTask(this.state.newValue, this.props.id);
      this.setState({ condition: true });
    }
  };

  deleteTask = () => {
    this.props.deleteTask(this.props.id);
  };

  changeCondition = (e) => {
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
          <div id='inputArea' onDoubleClick={this.changeCondition}>
            <p
              className= {this.props.isCompleted ? 'completed' : 'uncompleted'}
            >
              {this.props.task}
            </p>
            <button className={'delete'} onClick={this.deleteTask}>
              ×
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <input
            className='valueChanger'
            value={this.state.newValue || this.props.task}
            onChange={this.inputHandler}
            onKeyDown={this.submitHandler}
            onBlur={this.submitHandler}
            type='text'
          />
        </>
      );
    }
  };

  render() {
    return (
      <>
      <li>
      {this.state.condition ? (
        <>
        <input
          type='checkbox'
          className='checkbox'
          onChange={this.checkboxHandler}
          checked={this.props.isCompleted}
        />
        <div id='inputArea' onDoubleClick={this.changeCondition}>
          <p
            className= {this.props.isCompleted ? 'completed' : 'uncompleted'}
          >
            {this.props.task}
          </p>
          <button className={'delete'} onClick={this.deleteTask}>
            ×
          </button>
        </div>
      </>
      ) : (
        <>
          <input
            className='valueChanger'
            value={this.state.newValue || this.props.task}
            onChange={this.inputHandler}
            onKeyDown={this.submitHandler}
            onBlur={this.submitHandler}
            type='text'
          />
        </>
      )}
      </li>      </>
    );
  }
}

export default TaskElement;
