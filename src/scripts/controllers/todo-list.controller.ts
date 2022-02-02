import TodoListModel from '../models/todo-list.model';
import { Filters, ITodoItem } from '../types';
import TodoListView from '../views/todo-list.view';

export default class TodoListController {
  private currentFilterValue: Filters = <Filters>localStorage.getItem('filterState') || Filters.ALL;

  constructor(private readonly _todoListModel: TodoListModel, private readonly _todoListView: TodoListView) {
    _todoListView.init({
      onInput: this.actionInput.bind(this),
      onSubmit: this.actionAdd.bind(this),
      onChange: this.actionChange.bind(this),
      onToggle: this.actionToggle.bind(this),
      onRemove: this.actionRemove.bind(this),
      onDeleteAllCompleted: this.actionRemoveAllComplete.bind(this),
      onClickFilter: this.actionChangeFilter.bind(this)
    });
  }

  async init(): Promise<void> {
    await this._todoListModel.getAllTodos();
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  async actionInput(value: string): Promise<void> {
    this._todoListModel.currentInputValue = await value;
  }

  async actionAdd(): Promise<void> {
    const text = this._todoListModel.currentInputValue.trim();
    if (text) {
      await this._todoListModel.create(text);
      await this._todoListModel.getAllTodos();
      this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
    } else {
      console.log('neudacha');
    }
  }

  async actionChange(id: number, text: string): Promise<void> {
    await this._todoListModel.change(id, text);
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  async actionToggle(id: number): Promise<void> {
    await this._todoListModel.toggle(id);
    await this._todoListModel.getAllTodos();
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  async actionRemove(id: number): Promise<void> {
    await this._todoListModel.delete(id);
    await this._todoListModel.getAllTodos();
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  async actionRemoveAllComplete(): Promise<void> {
    await this._todoListModel.removeUnCompleted();
    await this._todoListModel.getAllTodos();
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }

  actionChangeFilter(value: Filters) {
    this.currentFilterValue = value;
    localStorage.setItem('filterState', value);
    this._todoListView.render(this._todoListModel.taskList, this.currentFilterValue);
  }
}
