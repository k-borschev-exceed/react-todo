import React from 'react';
import '../styles/Input.css';


class Input extends React.Component {
  state = {
    task: '',
  };

  inputHandler = (e) => {
    this.setState({ task: e.currentTarget.value });
  };

  onBtnClickHandler = (e) => {
    e.preventDefault()
    console.log('test');
    this.setState({task: ''})
    this.props.updateTasks(this.state.task, +new Date(), false);
  };

  render() {
    return (
      <form onSubmit={this.onBtnClickHandler}>
        <input
          type='text'
          placeholder='What needs to be done'
          value={this.state.task}
          onChange={this.inputHandler}
        />
        <button type="submit" >
          add
        </button>
      </form>
    );
  }
}

export default Input;
