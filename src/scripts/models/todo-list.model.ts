import { ITodoItem } from '../types';

export default class TodoListModel {
  currentInputValue = '';

  taskList: ITodoItem[] = [
    {
      id: 1321321,
      text: 'fsdfasf',
      checked: false
    },
    {
      id: 1321321,
      text: 'true',
      checked: true
    }
  ];

  create(text: string) {
    const todo: ITodoItem = {
      id: Math.floor(Math.random() * 100000),
      text,
      checked: false
    };

    this.taskList.push(todo);
  }
}
