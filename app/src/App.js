import React, { Component } from 'react';
import './css/App.css';
import TodoList from './components/todolist';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  enterItem(e) {
    
    if (e.keyCode === 13) {
      let joined = this.state.items.concat({ text: e.target.value, button: "編輯", show: false, check: false, id: this.state.items.length + 1 });
      console.log(joined);
      this.setState({ items: joined });
      this.setLocalStorage(joined);
      e.target.value = '';
    }
  }

  deleteItem(id) {
    let newState = this.state;
    let index = newState.items.findIndex(item => item.id === id);
    if (index === -1) return;
    newState.items.splice(index, 1);
    this.setState({ items: newState.items });
    this.setLocalStorage(newState.items);
  }

  change(id, value) {
    let newState = this.state;
    let index = newState.items.findIndex(item => item.id === id);
    newState.items[index].text = value;
    this.setState({ items: newState.items })
    this.setLocalStorage(newState.items);
  }

  mode(id) {
    let newState = this.state;
    let index = newState.items.findIndex(item => item.id === id);
    let isShow = newState.items[index].show;
   
    if (newState.items[index].show === false) {
      newState.items[index].show = !isShow;  
      newState.items[index].button = '保存';
      this.setState({ items: newState.items });
    } else {
      newState.items[index].show = !isShow;  
      newState.items[index].button = '編輯';
      this.setState({ items: newState.items });
    }
  }

  check(id) {
    let newState = this.state;
    let index = newState.items.findIndex(item => item.id === id);
    let isCheck = newState.items[index].check;
    newState.items[index].check = !isCheck;
    this.setState({ items: newState.items });
    this.setLocalStorage(newState.items);
  }

  setLocalStorage(items) {
    let itemsString = JSON.stringify(items);
    localStorage.setItem('todolist', itemsString);
  }

  componentDidMount() {
    let defaultList = [{ text: '洗澡', button: "編輯", show: false, check: true, id: 1 }, { text: '吃飯', button: "編輯", show: false, check: true, id: 2 }, { text: '看電視', button: "編輯", show: false, check: false, id: 3 }, { text: '寫作業', button: "編輯", show: false, check: false, id: 4 }];
    let newState = JSON.parse(localStorage.getItem('todolist')) || defaultList;
    this.setState({ items: newState });
    
  }

  render() {
    
    return (
    	<div className="container text-center">
        <h1>待辦事項</h1>
        <input className="enter" type="text" onKeyUp={this.enterItem.bind(this)} placeholder="請輸入..."/>
        <TodoList items={this.state.items} change={this.change.bind(this)} deleteItem={this.deleteItem.bind(this)} mode={this.mode.bind(this)} check={this.check.bind(this)}/>
    	</div>
    )
  }
}

