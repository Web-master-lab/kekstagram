/* eslint-disable prefer-const */
import {openBigPicture} from './open-big-picture.js';
import { getData } from './api.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const picturesBlock = document.querySelector('.pictures');

const createMiniPicture = (photo) => {
  const pictureNewTemplate = pictureTemplate.cloneNode(true);
  const pictureImage = pictureNewTemplate.querySelector('.picture__img');
  let pictureLikes = pictureNewTemplate.querySelector('.picture__likes');
  let pictureComments = pictureNewTemplate.querySelector('.picture__comments');

  pictureImage.src = photo.url;
  pictureLikes.textContent = photo.likes;
  pictureComments.textContent = photo.comments.length;

  openBigPicture(pictureNewTemplate, photo);

  return pictureNewTemplate;
};

const createMiniPictures = (photosArray) => {
  for (let i = 0; i < photosArray.length; i++) {
    const photo = createMiniPicture(photosArray[i]);
    fragment.append(photo);
  }
  picturesBlock.append(fragment);
};

getData((photos) => {
  createMiniPictures(photos);
});

export {createMiniPictures};
