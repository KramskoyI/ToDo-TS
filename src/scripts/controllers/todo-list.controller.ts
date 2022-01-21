import TodoListModel from '../models/todo-list.model';
import { Filters, ITodoItem } from '../types';
import TodoListView from '../views/todo-list.view';

export default class TodoListController {
  private currentFilterValue: Filters = Filters.ALL;
  constructor(private readonly _todoListModel: TodoListModel, private readonly _todoListView: TodoListView) {
    _todoListView.init({
      onInput: this.actionInput.bind(this),
      onSubmit: this.actionAdd.bind(this),
      onChange: this.actionChange.bind(this),
      onToggle: this.actionToggle.bind(this),
    });
  }

  init(): void {
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  actionInput(value: string): void {
    this._todoListModel.currentInputValue = value;
  }

  actionAdd(): void {
    const text = this._todoListModel.currentInputValue.trim();
    if (text) {
      this._todoListModel.create(text);
      this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
    }
  }

  actionChange(id: number, text: string): void {
    this._todoListModel.taskList = this._todoListModel.taskList.map((todo) => {
      if (todo.id === id) {
        return  {
          ...todo,
          text
        };
      } else {
        return todo;
      }
    });
    console.log(this._todoListModel.taskList)
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  actionToggle(id: number): void {
    this._todoListModel.toggle(id);
    console.log(this._todoListModel.taskList);

    this._todoListView.render(
      this._todoListModel.taskList,
      this.currentFilterValue
    );
  }
  

  actionRemove(): void {
    //1 - mode;.delete();
    //2 - view.render() ;
  }
}
