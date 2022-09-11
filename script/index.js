import {getStorage} from './modules/serviceStorage.js';
import {renderTodo, renderTask} from './modules/render.js'
import {
  checkInput,
  addControl,
  deleteControl,
  successControl,
  resetControl,
} from './modules/control.js'

export const data = [];
{

  const askUser = () => {
    const askUser = prompt('Ведите имя')

    return askUser
  };

  const init = (selectorApp) => {
    window.user = askUser();
    const app = document.querySelector(selectorApp)
    const todo = renderTodo(app)
    let data = getStorage(user); 


    const {
      list,
      form,
      table
    } = todo;

    const btnAdd = form[1];
    const btnReset = form[2];

    btnAdd.setAttribute('disabled', true);
    checkInput(btnAdd);

    renderTask(list, data);

    addControl(form, list);
    resetControl(btnReset, form, btnAdd);
    deleteControl(list);
    successControl(list);

    console.log(data);
  };
  
  window.todoApp = init;
}
