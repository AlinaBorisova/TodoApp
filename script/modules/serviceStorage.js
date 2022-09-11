import {data} from '../index.js';

export const getStorage = (keyItem) => {
  if(localStorage.getItem(user)) {
    return JSON.parse(localStorage.getItem(keyItem));
  } else return [];
};

export const setStorage = (task) => {
  data.push(task);
  localStorage.setItem(user, JSON.stringify(data));
};

export const removeStorage = function(trTask) {
  let items = JSON.parse(localStorage.getItem(user));
    for (let i = 0; i < items.length; i++) {
      if (items[i].id == trTask.id) items.splice(i, 1);
    };
  localStorage.setItem(user, JSON.stringify(items));
};