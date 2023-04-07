import throttle from 'lodash.throttle';

const STORAGE_KEY_FORM = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');
let formData = {};

formEl.addEventListener('input', throttle(formDataAction, 500));
formEl.addEventListener('submit', onFormSubmit);

onloadData();

function formDataAction(e) {
  formData[e.target.name] = e.target.value;
  onSaveData();
}

function onFormSubmit(e) {
  e.preventDefault();
  e.target.reset();
  console.log(formData);
  formData = {};
  localStorage.removeItem(STORAGE_KEY_FORM);
}

function onSaveData() {
  localStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(formData));
}

function onloadData() {
  const storageData = localStorage.getItem(STORAGE_KEY_FORM);

  if (storageData) {
    formData = JSON.parse(storageData);
    console.log(formData);
    const keys = Object.keys(formData);
    for (key of keys) {
      formEl.elements[key].value = formData[key];
    }
  }
}
