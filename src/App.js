import React from 'react';
import './App.css';
import Input from './partials/Input';
import List from './partials/List';
import Footer from './partials/Footer';

class App extends React.Component {
  state = {
    tasks: [],
    showCondition: 'all',
    tasksCounter: [0, 0, 0],
  };

  findIndexById = (id) => {
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (id === this.state.tasks[i].id) return i;
    }
  };

  changeCompleteness = (id, isCompleted) => {
    let tempItems = this.state.tasks;
    let index = this.findIndexById(id);

    tempItems[index] = {
      task: tempItems[index].task,
      id: tempItems[index].id,
      isCompleted: isCompleted,
    };

    this.setState({ tasks: tempItems });
    this.setState({
      tasksCounter: [
        this.state.tasks.length,
        this.state.tasks.reduce((sum, current) => sum + current.isCompleted, 0),
        this.state.tasks.reduce((sum, current) => sum + !current.isCompleted, 0),
      ],
    });
  };

  deleteTask = (id) => {
    let index = this.findIndexById(id);
    let tempItems = this.state.tasks;

    tempItems.splice(index, 1);

    this.setState({ tasks: tempItems });
    this.setState({
      tasksCounter: [
        this.state.tasks.length,
        this.state.tasks.reduce((sum, current) => sum + current.isCompleted, 0),
        this.state.tasks.reduce((sum, current) => sum + !current.isCompleted, 0),
      ],
    });
  };

  changeTask = (value, id) => {
    let tempItems = this.state.tasks;
    let index = this.findIndexById(id);

    tempItems[index] = {
      task: value,
      id: tempItems[index].id,
      isCompleted: tempItems[index].isCompleted,
    };
    this.setState({ tasks: tempItems });
  };

  updateTasks = async (task, id, isCompleted, completeAll) => {
    let data;

    if (completeAll) {
      data = [...this.state.tasks].map((item) => {
        return { task: item.task, id: item.id, isCompleted: true };
      });
    } else {
      data = [...this.state.tasks, { task, id, isCompleted }];
    }

    await this.setState({ tasks: data });
    this.setState({
      tasksCounter: [
        this.state.tasks.length,
        this.state.tasks.reduce((sum, current) => sum + current.isCompleted, 0),
        this.state.tasks.reduce((sum, current) => sum + !current.isCompleted, 0),
      ],
    });
  };

  completeAll = () => {
    this.state.tasks.forEach((item) => {
      this.changeCompleteness(item.id, true);
    });
    this.setState({
      tasksCounter: [
        this.state.tasks.length,
        this.state.tasks.reduce((sum, current) => sum + current.isCompleted, 0),
        this.state.tasks.reduce((sum, current) => sum + !current.isCompleted, 0),
      ],
    });
  };

  deleteAll = () => {
    this.setState({ tasks: [] });
    this.setState({ tasksCounter: [0, 0, 0] });
  };

  showActive = () => {
    this.setState({ showCondition: 'uncompleted' });
  };

  showAll = () => {
    this.setState({ showCondition: 'all' });
  };

  showCompleted = () => {
    this.setState({ showCondition: 'completed' });
  };

  render() {
    return (
      <div className='App'>
        <h1>todos</h1>
        <Input updateTasks={this.updateTasks} />
        <List
          tasks={this.state.tasks}
          changeCompleteness={this.changeCompleteness}
          showCondition={this.state.showCondition}
          deleteTask={this.deleteTask}
          taskElemHandler={this.taskElemHandler}
          changeTask={this.changeTask}
        />
        <Footer
          completeAll={this.completeAll}
          deleteAll={this.deleteAll}
          showActive={this.showActive}
          showAll={this.showAll}
          showCompleted={this.showCompleted}
          tasksCounter={this.state.tasksCounter}
        />
      </div>
    );
  }
}

export default App;
