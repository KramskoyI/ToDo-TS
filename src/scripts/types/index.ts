export interface ITodoItem {
  id: number;
  text: string;
  checked: boolean;
}

export interface IActions {
  onInput: (value: string) => void; // arrow function
  onSubmit: () => void;
  onChange: (id: number, text: string) => void;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onDeleteAllCompleted: () => void;
  onClickFilter: (value: Filters) => void;
}

export interface IListener {
  eventName: string;
  callback: EventListenerOrEventListenerObject;
}

export enum KeyboardKeys {
  ENTER_KEY = 'Enter',
  ESCAPE_KEY = 'Escape'
}

export enum Filters {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active'
}
