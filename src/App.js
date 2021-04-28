import React from 'react';
import './App.css';
import Input from './components/Input';
import List from './components/List';
import Footer from './components/Footer';

//обновлять каждый раз список, а кей - _id mongodb

export default class App extends React.Component {
  state = {
    tasks: [],
    showCondition: 'all',
    tasksCounter: { all: 0, completed: 0, active: 0 },
  };

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = async () => {
    fetch('/tasks/')
      .then((res) => res.json())
      .then(async (tasks) => {
        await this.setState({ tasks });
        this.stateTasksCounter();
      });
  };

  addTask = async (title, isCompleted) => {
    await fetch('/tasks/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ title, isCompleted }),
    }).catch(function (err) {
      console.log(err);
    });
    await this.fetchTasks();
  };

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
    fetch('/tasks/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify([{ id: id, isCompleted: isCompleted }]),
    });
    let tempItems = [...this.state.tasks];
    let index = this.findIndexById(id);
    tempItems[index] = {
      title: tempItems[index].title,
      id: tempItems[index].id,
      isCompleted: isCompleted,
    };

    await this.setState({ tasks: tempItems });
    this.stateTasksCounter();
    await this.fetchTasks();
  };

  deleteTask = async (id) => {
    await fetch('/tasks/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify([{ id: id }]),
    });
    await this.fetchTasks();
    await this.fetchTasks(); // по неизвестной причине не всегда срабатывает с первого раза
  };

  changeTask = async (value, id) => {
    fetch('/tasks/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify([{ id: id, title: value }]),
    });
    await this.fetchTasks();
  };

  completeAll = () => {
    let tempItems = [...this.state.tasks];

    tempItems.forEach((item) => {
      item.isCompleted = !(
        this.state.tasksCounter.all === this.state.tasksCounter.completed
      );
    });

    fetch('/tasks/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(
        tempItems.map((e) => {
          return { isCompleted: e.isCompleted, id: e.id };
        })
      ),
    });
    this.setState({ tasks: tempItems });
    this.stateTasksCounter();
  };

  clearCompleted = async () => {
    let tempItems = this.state.tasks.filter((e) => !e.isCompleted);
    fetch('/tasks/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify(
        this.state.tasks.filter((x) => tempItems.indexOf(x) === -1)
      ),
    });
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
