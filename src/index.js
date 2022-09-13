import './styles.css';

// import { saludar } from './js/components';

import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/components';

export const todoList = new TodoList();

// todoList.todos.forEach(todo => crearTodoHtml(todo));
todoList.todos.forEach(crearTodoHtml);

todoList.todos[0].imprimirClase();


// const tarea = new Todo('Aprender JavaScript');
// const tarea2 = new Todo('Comprar Apple Watch');

// todoList.nuevoTodo(tarea);

// crearTodoHtml(tarea);

// localStorage.setItem('mi-key', JSON.stringify(todoList));

// setTimeout(() => {
//     localStorage.removeItem('mi-key');
// })

// todoList.nuevoTodo(tarea2);

// const nombre = 'Juan';

// saludar(nombre);

