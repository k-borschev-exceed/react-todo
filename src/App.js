import React from 'react';
import './App.css';
import Input from './partials/Input';
import List from './partials/List';
import Footer from './partials/Footer';

class App extends React.Component {
  state = {
    tasks: [],
  };

  makeCompleted = (id) => {
    let data = [...this.state.tasks].map((item, index) => {
      if (id === item.id) return { item, index };
      return null;
    });

    let items = this.state.tasks;
    console.log(data[0])
    data.item = { task: data[0].item.task, id: data[0].item.id, isCompleted: true };
    items.splice(data.index, 1, data.item);

    this.setState({ tasks: items });
  };

  updateTasks = (task, id, isCompleted, completeAll) => {
    let data;

    if (completeAll) {
      data = [...this.state.tasks].map((item) => {
        return { task: item.task, id: item.id, isCompleted: true };
      });
    } else {
      data = [...this.state.tasks, { task, id, isCompleted }];
    }
    this.setState({ tasks: data });
  };

  completeAll = () => {
    this.updateTasks(0, 0, 0, true);
  };

  deleteAll = () => {};

  render() {
    console.log(this.state);
    return (
      <div className='App'>
        <h1>todos</h1>
        <Input updateTasks={this.updateTasks} />
        <List tasks={this.state.tasks} makeCompleted={this.makeCompleted}/>
        <Footer completeAll={this.completeAll} deleteAll={this.deleteAll}/>
      </div>
    );
  }
}

export default App;
