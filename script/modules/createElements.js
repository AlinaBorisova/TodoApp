import {setStorage} from './serviceStorage.js';
import {data} from '../index.js';

export const createContainer = () => {
  const container = document.createElement('container')
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.flex = 'column';

  return container;
};

export const createHeader = () => {
  const header = document.createElement('header');
  const h3 = document.createElement('h3');
    h3.textContent = `Todo App`;

    header.style.background = 'blue';
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.justifyContent = 'center';
    header.style.flex = 'column';
    header.style.marginBottom = '40px';
    header.style.padding = '20px';

    h3.style.fontSize = '50px';

  const headerContainer = createContainer();
  header.append(headerContainer, h3);
  header.headerContainer = headerContainer;

  return header;
};

export const createButtonGroup = (params) => {
  const btnWtapper = document.createElement('div');
    btnWtapper.classList.add('btn-wrapper');

  const btns = params.map(({className, type, text}) => {
    const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;

    return button;
  });

  btnWtapper.append(...btns);

  return {
    btnWtapper,
    btns,
  };
};

export const createForm = () => {
const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.alignItems = 'center';
  form.style.marginBottom = '20px';
  form.style.justifyContent = 'center';
  form.style.flex = 'column';

const label = document.createElement('label');
  label.style.display = 'inline-block'
  label.style.boSizing = 'border-box';

const inputTask = document.createElement('input');
  inputTask.classList.add('form-control')
  inputTask.style.width = '200px'
  inputTask.style.marginRight = '10px'
  inputTask.style.marginBottom = '0px'
  inputTask.placeholder = 'Add task'  
inputTask.append(label)

const buttons = createButtonGroup([{
  className: 'btn btn-primary mr-3',
  type: 'submit',
  text: 'Сохранить',
  },
  {
  className: 'btn btn-warning',
  type: 'reset',
  text: 'Очистить',
  },
]);
  
  const btnAdd = buttons.btns[0];
  const btnReset = buttons.btns[1];

  form.append(inputTask, btnAdd, btnReset);

  return form;
};

export const createTable = () => {
  const tableWrapper = document.createElement('div');
  const table = document.createElement('table');
    table.classList.add('table', 'table-hover', 'table-bordered');
    table.style.width = '50%';
    table.style.margin = 'auto';
  
  const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
  `);

  const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    tableWrapper.append(table);

  return table;
};

export const createRow = (inputTask) => {
  const tr = document.createElement('tr');
    tr.classList.add('table-light');
    tr.setAttribute('id', inputTask.id);
      if (inputTask.checked) {
        tr.style.color = 'Green'
        tr.style.textDecoration ='line-through'
      }

  const tdNum = document.createElement('td');
    tdNum.textContent = data.length + 1;

  const tdTask = document.createElement('td');
    tdTask.classList.add('task');
    tdTask.textContent = inputTask.todoText;

  const tdStatus = document.createElement('td');
    tdStatus.classList.add('task-status');
    tdStatus.textContent = 'В работе';
      if (inputTask.checked) {tdStatus.textContent = 'Выполнено'};

  const tdButtons = document.createElement('td');
  const buttonDel = document.createElement('button');
    buttonDel.classList.add('btn', 'btn-danger');
    buttonDel.textContent = 'Удалить';
    buttonDel.setAttribute('id', tr.id);

  const buttonSuccess = document.createElement('button');
    buttonSuccess.classList.add('btn', 'btn-success');
    buttonSuccess.textContent = 'Завершить';
    buttonSuccess.setAttribute('id', tr.id);

    tdButtons.append(buttonDel, buttonSuccess);

    tr.append(tdNum, tdTask, tdStatus, tdButtons);

    setStorage(inputTask);

  return tr;
};
