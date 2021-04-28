import React from 'react';
import './App.css';
import Input from './components/Input';
import List from './components/List';
import Footer from './components/Footer';

export default class App extends React.Component {
  state = {
    tasks: [],
    showCondition: 'all',
    tasksCounter: { all: 0, completed: 0, active: 0 },
  };

  componentDidMount() {
    fetch('/todos/')
      .then((res) => res.json())
      .then((tasks) => {
        tasks.forEach((item) => (item.id = item.key));
        this.setState({ tasks });
        this.stateTasksCounter();
      });
  }

  findIndexById = (id) => {
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (id === this.state.tasks[i].id) return i;
    }
  };

  stateTasksCounter = () => {
    this.setState({
      tasksCounter: {
        all: this.state.tasks.length,
        completed: this.state.tasks.reduce(
          (sum, current) => sum + current.isCompleted,
          0
        ),
        active: this.state.tasks.reduce(
          (sum, current) => sum + !current.isCompleted,
          0
        ),
      },
    });
  };

  changeCompleteness = async (id, isCompleted) => {
    fetch('/todos/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ key: id, isCompleted: isCompleted }),
    });
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
    fetch('/todos/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify({ key: id }),
    });
    let index = this.findIndexById(id);
    let tempItems = this.state.tasks;

    tempItems.splice(index, 1);

    this.setState({ tasks: tempItems });
    this.stateTasksCounter();
  };

  changeTask = (value, id) => {
    fetch('/todos/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ key: id, task: value }),
    });
    let tempItems = this.state.tasks;
    let index = this.findIndexById(id);

    tempItems[index] = {
      task: value,
      id: tempItems[index].id,
      isCompleted: tempItems[index].isCompleted,
    };
    this.setState({ tasks: tempItems });
  };

  addTask = async (task, id, isCompleted) => {
    fetch('/todos/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ task, isCompleted, key: id }),
    })
      .catch(function (res) {
        console.log(res);
      });
    let data = [...this.state.tasks, { task, id, isCompleted }];

    await this.setState({ tasks: data });
    this.stateTasksCounter();
  };

  completeAll = () => {
    let tempItems = [...this.state.tasks];

    tempItems.forEach((item) => {
      item.isCompleted = !(
        this.state.tasksCounter.all === this.state.tasksCounter.completed
      );

      fetch('/todos/', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({ key: item.id, isCompleted: item.isCompleted }),
      });
    });

    this.setState({ tasks: tempItems });
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
          addTask={this.addTask}
          completeAll={this.completeAll}
          isAllCompleted={
            this.state.tasksCounter.all === this.state.tasksCounter.completed
          }
          isNotEmpty={this.state.tasksCounter.all}
        />

        {!!this.state.tasks.length && (
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
        )}
      </div>
    );
  }
}
