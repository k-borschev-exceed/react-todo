import React from 'react';
import './App.css';
import Input from './partials/Input';
import List from './partials/List';
import Footer from './partials/Footer';

class App extends React.Component {
  state = {
    tasks: [],
    showCondition: 'all',
    tasksCounter: {all: 0, completed: 0, active: 0},
  };

  findIndexById = (id) => {
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (id === this.state.tasks[i].id) return i;
    }
  };

  stateTasksCounter = () => {
    this.setState({
      tasksCounter: {
        all : this.state.tasks.length,
        completed : this.state.tasks.reduce((sum, current) => sum + current.isCompleted, 0),
        active: this.state.tasks.reduce(
          (sum, current) => sum + !current.isCompleted,
          0
        ),
        },
    });
  };

  changeCompleteness = async (id, isCompleted) => {

    let tempItems = [...this.state.tasks];
    let index = this.findIndexById(id);
    tempItems[index] = {
      task: tempItems[index].task,
      id: tempItems[index].id,
      isCompleted: isCompleted,
    };

    await this.setState({ tasks: tempItems });
    this.stateTasksCounter();
  };

  deleteTask = (id) => {
    let index = this.findIndexById(id);
    let tempItems = this.state.tasks;

    tempItems.splice(index, 1);

    this.setState({ tasks: tempItems });
    this.stateTasksCounter();
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
      data = this.state.tasks.map((item) => {
        return { task: item.task, id: item.id, isCompleted: true };
      });
    } else {
      data = [...this.state.tasks, { task, id, isCompleted }];
    }

    await this.setState({ tasks: data });
    this.stateTasksCounter();
  };

  completeAll = () => {
    let tempItems = [...this.state.tasks]

    tempItems.forEach((item) => {
      item.isCompleted = !(this.state.tasksCounter.all === this.state.tasksCounter.completed)
    });

    this.setState({tasks: tempItems})
    this.stateTasksCounter();
  };

  clearCompleted = async () => {
    let tempItems = this.state.tasks.filter((e) => !e.isCompleted);
    await this.setState({ tasks: tempItems });
    this.stateTasksCounter();
  };

  showActive = () => this.setState({ showCondition: 'uncompleted' });

  showAll = () => this.setState({ showCondition: 'all' });

  showCompleted = () => this.setState({ showCondition: 'completed' });

  render() {
    return (
      <div className='App'>
        <h1>todos</h1>
        <Input
          updateTasks={this.updateTasks}
          completeAll={this.completeAll}
          isAllCompleted={
            this.state.tasksCounter.all === this.state.tasksCounter.completed
          }
          isNotEmpty={this.state.tasksCounter.all}
        />

        {!!this.state.tasks.length &&
          <>
            <List
              tasks={this.state.tasks}
              changeCompleteness={this.changeCompleteness}
              showCondition={this.state.showCondition}
              deleteTask={this.deleteTask}
              taskElemHandler={this.taskElemHandler}
              changeTask={this.changeTask}
            />
            <Footer
              clearCompleted={this.clearCompleted}
              showActive={this.showActive}
              showAll={this.showAll}
              showCompleted={this.showCompleted}
              showCondition={this.state.showCondition}
              tasksCounter={this.state.tasksCounter}
            />
          </>
        }
      </div>
    );
  }
}

export default App;
