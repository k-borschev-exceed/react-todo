import React from 'react';
import './TaskElement.css';
export default class TaskElement extends React.Component {
  state = {
    inputCondition: true,
    newValue: '',
  };

  inputHandler = (e) => this.setState({ newValue: e.currentTarget.value });

  checkboxHandler = () => this.props.changeCompleteness(this.props.id, !this.props.isCompleted);

  submitHandler = (event) => {
    if (event.type === 'blur' || event.key === 'Enter') {
      this.props.changeTask(this.state.newValue, this.props.id);
      this.setState({ inputCondition: true });
    }
  };

  deleteTask = () => this.props.deleteTask(this.props.id);

  changeCondition = () => this.setState({ inputCondition: false });

  render() {
    return (
      <>
      <li className="taskElement">
      {this.state.inputCondition ? (
        <>
        <input
          type='checkbox'
          className='checkbox'
          onChange={this.checkboxHandler}
          checked={this.props.isCompleted}
        />
        <div id='inputArea' onDoubleClick={this.changeCondition}>
          <p
            className= {this.props.isCompleted ? 'completed taskvalue' : 'uncompleted taskvalue'}
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

