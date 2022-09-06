'use strict';
{
  let data = [];

  const askUser = () => {
    const askUser = prompt('Ведите имя')

    return askUser
  };

  const getStorage = (keyItem) => {
    if(localStorage.getItem(user)) {
      return JSON.parse(localStorage.getItem(keyItem))
    } else return [];
  };

  const setStorage = (task) => {
    data.push(task);
    localStorage.setItem(user, JSON.stringify(data))
  };

  const removeStorage = function(trTask) {
    let items = JSON.parse(localStorage.getItem(user));
      for (let i = 0; i < items.length; i++) {
        if (items[i].id == trTask.id) items.splice(i, 1);
      };
    localStorage.setItem(user, JSON.stringify(items));
  };

//   const createModal = () => {

// const modalForm = document.createElement('div')
// modalForm.classList.add('modal')

// const modalContent = document.createElement('div');
// modalContent.classList.add('modal-content')

// const modalHeader = document.createElement('div')
// modalHeader.classList.add('modal-header');

// const h2 = document.createElement('h2');
// h2.classList.add('modal-title')
// h2.textContent = 'Введите Ваше Имя'

// const modalBody = document.createElement('div')
// modalBody.classList.add('modal-body')

// const textModal = document.createElement('p')
// textModal.textContent = 'Modal body text goes here.'

// const modalFooter = document.createElement('div')
// modalFooter.classList.add('modal-footer')

// const buttonEnter = document.createElement('button')
// buttonEnter.classList.add('btn', 'btn-primary')
// // buttonEnter.type = button;
// buttonEnter.textContent = 'Войти'


//   modalHeader.append(h2)
//   modalBody.append(textModal)
//   modalFooter.append(buttonEnter)
//   modalForm.append(modalHeader, modalBody, modalFooter)

//   return modalForm

//   }

  const createContainer = () => {
    const container = document.createElement('container')
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';
      container.style.flex = 'column';

    return container;
  };

  const createHeader = () => {
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

  const createButtonGroup = (params) => {
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

  const createForm = () => {
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

  const checkInput = (btnAdd) => {
    const inputTask = document.querySelector('.form-control');
      btnAdd.setAttribute('disabled', true);

      inputTask.addEventListener('input', () => {
        if (inputTask.value === '') {
          btnAdd.setAttribute('disabled', true)
        } else { 
          btnAdd.disabled = false;
        }
      })
  }

  const createTable = () => {
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

  const createRow = (inputTask) => {
    const tr = document.createElement('tr');
      tr.classList.add('table-light')
      tr.setAttribute('id', inputTask.id)

    const tdNum = document.createElement('td');
      tdNum.textContent = data.length + 1;

    const tdTask = document.createElement('td');
      tdTask.classList.add('task');
      tdTask.textContent = inputTask.todoText;
 
    const tdStatus = document.createElement('td');
      tdStatus.textContent = 'В работе';

    const tdButtons = document.createElement('td');
    const buttonDel = document.createElement('button');
      buttonDel.classList.add('btn', 'btn-danger');
      buttonDel.textContent = 'Удалить';
      buttonDel.setAttribute('id', tr.id)

    const buttonSuccess = document.createElement('button');
      buttonSuccess.classList.add('btn', 'btn-success');
      buttonSuccess.textContent = 'Завершить';
      buttonSuccess.setAttribute('id', tr.id)

      tdButtons.append(buttonDel, buttonSuccess);

      tr.append(tdNum, tdTask, tdStatus, tdButtons);

      setStorage(inputTask)

    return tr;
  };

  const renderTodo = (app) => {
    // const modal = createModal()
    const header = createHeader();
    const form = createForm();
    const table = createTable();

    app.append(header, form, table);


    return {
      list: table.tbody,
      form,
    };
  };

  const renderTask = (elem, data) => {
    const allRow = data.map(createRow);
      elem.append(...allRow);
    
    return allRow;
  }

  const addTaskPage = (inputTask, list) => {
    list.append(createRow(inputTask))
  }

  const addControl = (form, list) => {
    form.addEventListener('submit' || 'enter', e => {
      e.preventDefault();

      let newTask = {
        id: Math.random().toString().substring(2, 10),
        num: data.length + 1,
        todoText: form[0].value,
        checked: false,
      };

      addTaskPage(newTask, list);

      const btnAdd = form[1];
        btnAdd.setAttribute('disabled', true);
        checkInput(btnAdd);

        form.reset();
    });
  };
  
  const deleteControl = (list) => {
    for (let i = 0; i < data.length; i++) {
      list.addEventListener('click', e => {
        const target = e.target;
        let trTask = e.target.closest('tr').querySelector('td:nth-child(4) button');
          if (target.closest('.btn-danger')) {
            target.closest('.table-light').remove();
            data.splice([i], 1);
            removeStorage(trTask);
          };
      });
    }
  };

  const successControl = (list) => {
    for (let i = 0; i < data.length; i++) {
      list.addEventListener('click', e => {
        const target = e.target;
          if (data[i].id === target.closest('.table-light').id) {
            data[i].checked = true;
          };
          if (target.closest('.btn-success')) {
            target.closest('.table-light').style.color = 'Green'
            target.closest('.table-light').style.textDecoration ='line-through'

            localStorage.setItem(user, JSON.stringify(data));
          };
      });
    };
  };

  const resetControl = (btnReset, form, btnAdd) => {
    btnReset.addEventListener('click', () => {
      form.reset();
      checkInput(btnAdd);
    })
  }

  const init = (selectorApp) => {
    window.user = askUser();
    const app = document.querySelector(selectorApp)
    // createModal()
    const todo = renderTodo(app)
    let data = getStorage(user); 


    const {
      list,
      form,
    } = todo;

    const btnAdd = form[1];
    const btnReset = form[2];

      btnAdd.setAttribute('disabled', true);
      checkInput(btnAdd);

    renderTask(list, data);
    addControl(form, list)
    resetControl(btnReset, form, btnAdd)
    deleteControl(list)
    successControl(list)
    console.log(data)
  };
  
  window.todoApp = init;
}
