import {removeStorage} from './serviceStorage.js';
import {createRow} from './createElements.js'
import {data} from '../index.js';
  
const addTaskPage = (inputTask, list) => {
  list.append(createRow(inputTask))
};

export const checkInput = (btnAdd) => {
  const inputTask = document.querySelector('.form-control');
    btnAdd.setAttribute('disabled', true);

    inputTask.addEventListener('input', () => {
      if (inputTask.value === '') {
        btnAdd.setAttribute('disabled', true)
      } else { 
        btnAdd.disabled = false;
      };
    });
};

export const addControl = (form, list) => {
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

export const deleteControl = (list) => {
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
  };
};

export const successControl = (list) => {
  for (let i = 0; i < data.length; i++) {
    list.addEventListener('click', e => {
      const target = e.target;
        if (data[i].id === target.closest('.btn-success').id) {
          data[i].checked = true;
        };
        if (data[i].checked && target.closest('.btn-success')) {
          target.closest('.table-light').style.color = 'Green'
          target.closest('.table-light').style.textDecoration ='line-through'
        };
        localStorage.setItem(user, JSON.stringify(data));
    });
  };
};

export const resetControl = (btnReset, form, btnAdd) => {
  btnReset.addEventListener('click', () => {
    form.reset();
    checkInput(btnAdd);
  });
};
