// import '../css/componentes.css';
// import webpacklogo from '../assets/img/webpack-logo.png'

import { Todo } from "../classes";
import { todoList } from '../index';

// export const saludar = (nombre) => {
//     console.log('Creando eitqueta h1');

//     const h1 = document.createElement('h1');

//     h1.innerText = `Hola, ${ nombre }`;

//     document.body.append(h1);

//     // Img
//     console.log(webpacklogo);
//     const img = document.createElement('img');
//     img.src = webpacklogo;

//     document.body.append(img);
// }
// Referencias en el html

const divTodoList = document.querySelector('.todo-list')
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${ (todo.completado)? 'completed': '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado)? 'checked': '' }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

//eventos
txtInput.addEventListener('keyup', (event) => {
    if(event.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    // console.log(todoElemento);
    // console.log(todoId);

    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrar.addEventListener('click', (event) => {
    todoList.eliminarCompletados();
    for(let i = divTodoList.children.length -1; i>=0; i--){
        const element  = divTodoList.children[i];

        if(element.classList.contains('completed')){
            divTodoList.removeChild(element);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    console.log(event.target.text);
    const filtro = event.target.text;

    if(!filtro) { return; }

    anchorFiltros.forEach(element => element.classList.remove('selected'));

    event.target.classList.add('selected');

    for (const element of divTodoList.children) {
        // console.log(element);
        element.classList.remove('hidden');
        const completado = element.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if(completado){
                    element.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado){
                    element.classList.add('hidden');
                }
                break;
        }
    }
});

