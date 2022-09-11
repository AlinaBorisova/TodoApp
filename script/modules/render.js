import {
  createHeader,
  createForm,
  createTable,
  createRow,
} from './createElements.js'
  
export const renderTodo = (app) => {
  const header = createHeader();
  const form = createForm();
  const table = createTable();

  app.append(header, form, table);

  return {
    list: table.tbody,
    form,
  };
};

export const renderTask = (elem, data) => {
  const allRow = data.map(createRow);
    elem.append(...allRow);

  return allRow;
};