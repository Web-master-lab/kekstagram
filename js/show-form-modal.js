import { currentScaleValue, resetForm } from './form.js';
import { isSomeKey } from './util.js';

const overlay = document.querySelector('.img-upload__overlay');
const commentField = document.querySelector('.text__description');
const scaleValue = document.querySelector('.scale__control--value');
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const cancelButton = document.querySelector('#upload-cancel');
const fileField = document.querySelector('#upload-file');
const image = document.querySelector('.img-upload__preview').querySelector('img');

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  scaleValue.value = `${currentScaleValue}%`;
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

function onEscKeyDown (evt) {
  if (isSomeKey('Escape')  && !isTextFieldFocused) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
  resetForm();
};

const onFileInputChange = () => {
  const file = fileField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    image.src = URL.createObjectURL(file);
  }

  showModal();
};

fileField.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);

export {hideModal};
