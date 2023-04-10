/* eslint-disable prefer-const */
import {createPhotos} from './create-photos.js';
import {openBigPicture} from './open-big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const photosArray = createPhotos();
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

const createMiniPictures = () => {
  for (let i = 0; i < photosArray.length; i++) {
    const photo = createMiniPicture(photosArray[i]);
    fragment.append(photo);
  }
  picturesBlock.append(fragment);
};

createMiniPictures();

export {createMiniPictures};
