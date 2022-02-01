import { ITodoItem, Uri } from '../types';

export default class TodoListModel {
  currentInputValue = '';

  taskList: ITodoItem[] = [
    // {
    //   id: 1321321,
    //   text: 'fsdfasf',
    //   checked: false
    // },
    // {
    //   id: 1321321,
    //   text: 'true',
    //   checked: true
    // }
  ];

  async getAllTodos() {
    const response = await fetch(Uri.LINK);
    console.log(Uri.LINK);
    const data = await response.json();
    this.taskList = [...data];
    console.log('todos==>', this.taskList);
  }

  create(text: string) {
    const todo: ITodoItem = {
      id: Math.floor(Math.random() * 100000),
      text,
      checked: false
    };
    this.taskList.push(todo);
    // const response = await fetch(Uri.LINK, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ [key]: value }),
    // });
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
