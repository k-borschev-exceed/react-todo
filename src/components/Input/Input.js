import React from 'react';
import './Input.css';

export default class Input extends React.Component {
  state = {
    task: '',
  };

  inputHandler = (e) => {
    this.setState({ task: e.currentTarget.value });
  };

  onBtnClickHandler = (e) => {
    e.preventDefault();
    console.log(this.state.task, 'task state input js')
    if (this.state.task.trim()) this.props.updateTasks(this.state.task, +new Date(), false);
    this.setState({task: ''})
  };

  render() {
    return (
      <div id='input'>
        <button
          id='completeAllBtn'
          onClick={this.props.completeAll}
          className={
            this.props.isAllCompleted && this.props.isNotEmpty
              ? 'completed '
              : this.props.isNotEmpty
              ? ''
              : 'empty'
          }
        >
          &nbsp;
        </button>
        <form onSubmit={this.onBtnClickHandler}>
          <input
            type='text'
            placeholder='What needs to be done'
            value={this.state.task}
            onChange={this.inputHandler}
          />
        </form>
      </div>
    );
  }
}
