import { ITodoItem, Uri } from '../types';

export default class TodoListModel {
  currentInputValue = '';

  taskList: ITodoItem[] = JSON.parse(localStorage.getItem('currentTaskList')) || [];

  async getAllTodos() {
    const response = await fetch(Uri.LINK);
    const data = await response.json();
    this.taskList = [...data];
    console.log('data get', data, 'taskList', this.taskList);
    return localStorage.setItem('currentTaskList', JSON.stringify(this.taskList));
  }

  // getAllTodos() {
  //   fetch(Uri.LINK)
  //     .then((respons => respons.json))
  // }

  async create(text: string) {
    await fetch(Uri.LINK, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text })
    });
  }

  async toggle(id: number) {
    const todo = this.taskList.find((todo) => todo.id === id);
    await fetch(Uri.LINK + `${id.toString()}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: !todo.checked })
    });
  }

  async change(id: number, text: string) {
    await fetch(Uri.LINK + `${id.toString()}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: text })
    });
  }

  async delete(id: number) {
    await fetch(Uri.LINK + `${id.toString()}`, {
      method: 'DELETE',
      mode: 'cors'
    });
  }

  async removeUnCompleted() {
    await fetch(Uri.LINK + '0', {
      method: 'DELETE',
      mode: 'cors'
    });
  }
}
