import { isSomeKey } from './util.js';
import { sendData } from './api.js';
import {hideModal} from './show-form-modal.js';

const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const body = document.querySelector('body');
const buttonSubmit = document.querySelector('.img-upload__submit');
const errorWindowTemplate = document.querySelector('#error').content.querySelector('.error');
const errorWindow = errorWindowTemplate.cloneNode(true);
const errorCloseButton = errorWindow.querySelector('.error__button');
const successWindowTemplate = document.querySelector('#success').content.querySelector('.success');
const successWindow = successWindowTemplate.cloneNode(true);
const successCloseButton = errorWindow.querySelector('.error__button');
const scaleValue = document.querySelector('.scale__control--value');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const image = document.querySelector('.img-upload__preview').querySelector('img');
const commentField = document.querySelector('.text__description');
const fileField = document.querySelector('#upload-file');
const effectSlider = document.querySelector('.effect-level__slider');

let currentScaleValue = 100;

errorWindow.classList.add('hidden');
body.insertAdjacentElement('beforeend', errorWindow);

successWindow.classList.add('hidden');
body.insertAdjacentElement('beforeend', successWindow);

const MAX_HASHTAG_COUNT = 5;
const UNVALID_SYMBOLS = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const hasValidSymbols = (string) => UNVALID_SYMBOLS.test(string);

const isValidTag = (tag) => hasValidSymbols(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хэштеги'
);

const onButtonSmallerClick = () => {
  if (currentScaleValue !== 25) {
    currentScaleValue-= 25;
    image.style.transform = `scale(${currentScaleValue/100})`;
  }
  scaleValue.value = `${currentScaleValue}%`;
};

const onButtonBiggerClick = () => {
  if (currentScaleValue !== 100) {
    currentScaleValue+= 25;
    image.style.transform = `scale(${currentScaleValue/100})`;
  }
  scaleValue.value = `${currentScaleValue}%`;
};

const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Опубликовываю...';
};

const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Опубликовать';
};

const hideError = () => {
  errorWindow.classList.add('hidden');
  errorCloseButton.removeEventListener('click', hideError);
  document.removeEventListener('keydown', onErrorEscKeyDown);
  document.removeEventListener('click', onDocumentClickError);
};

const hideSuccess = () => {
  successWindow.classList.add('hidden');
  successCloseButton.removeEventListener('click', hideSuccess);
  document.removeEventListener('keydown', onSuccessEscKeyDown);
  document.removeEventListener('click', onDocumentClickSuccess);
};

function onErrorEscKeyDown (evt) {
  if (isSomeKey(evt, 'Escape')) {
    hideError();
  }
}

function onSuccessEscKeyDown (evt) {
  if (isSomeKey(evt, 'Escape')) {
    hideSuccess();
  }
}

function onDocumentClickError (evt) {
  if (evt.target !== errorWindow) {
    hideError();
  }
}

function onDocumentClickSuccess (evt) {
  if (evt.target !== errorWindow) {
    hideSuccess();
  }
}

const showError = () => {
  errorWindow.classList.remove('hidden');

  errorCloseButton.addEventListener('click', hideError);
  document.addEventListener('keydown', onErrorEscKeyDown);
  document.addEventListener('click', onDocumentClickError);
};

const showSuccess = () => {
  successWindow.classList.remove('hidden');

  successCloseButton.addEventListener('click', hideSuccess);
  document.addEventListener('keydown', onSuccessEscKeyDown);
  document.addEventListener('click', onDocumentClickSuccess);
};

const resetForm = () => {
  currentScaleValue = 100;
  image.style.transform = `scale(${currentScaleValue/100})`;
  image.style.filter = '';
  hashtagField.value = '';
  commentField.value = '';
  fileField.value = '';
  image.className = '';
  effectSlider.classList.add('hidden');
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        hideModal();
        showSuccess();
        unblockSubmitButton();
        resetForm();
      },
      () => {
        showError();
        unblockSubmitButton();
      },
      new FormData(evt.target)
    );
  }
};

form.addEventListener('submit', onFormSubmit);
buttonBigger.addEventListener('click', onButtonBiggerClick);
buttonSmaller.addEventListener('click', onButtonSmallerClick);

export {currentScaleValue, resetForm};
