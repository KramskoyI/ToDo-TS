import { ITodoItem, Uri } from '../types';

export default class TodoListModel {
  currentInputValue = '';

  taskList: ITodoItem[] = JSON.parse(localStorage.getItem('currentTaskList')) || [];

  async getAllTodos() {
    const response = await fetch(Uri.LINK);
    const data = await response.json();
    this.taskList = [...data];
    console.log('todos==>', this.taskList);
    return localStorage.setItem('currentTaskList', JSON.stringify(this.taskList));
  }

  async create(text: string) {
    // const todo = {
    // id: Math.floor(Math.random() * 100000),
    //   checked: false,
    //   text: text
    // };
    // this.taskList.push(todo);
    const response = await fetch(Uri.LINK, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text })
    });
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    // this.taskList = [...data];
    // console.log('todos==>', this.taskList);
    // return localStorage.setItem('currentTaskList', JSON.stringify(this.taskList));
  }

  toggle(id: number) {
    this.taskList = this.taskList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          checked: !todo.checked
        };
      } else {
        return todo;
      }
    });
  }

  delete(id: number) {
    this.taskList = this.taskList.filter((todo) => todo.id !== id);
  }

  removeUnCompleted() {
    this.taskList = this.taskList.filter((todo) => !todo.checked);
  }
}
