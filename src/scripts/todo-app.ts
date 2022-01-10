import TodoListView from './views/todo-list.view';
import TodoListModel from './models/todo-list.model';
import TodoListController from './controllers/todo-list.controller';

class TodoApp {
  start(): void {
    const view = new TodoListView(document.getElementById('root'));
    const model = new TodoListModel();
    const controller = new TodoListController(model, view);
    controller.init();
  }
}

export default TodoApp;
