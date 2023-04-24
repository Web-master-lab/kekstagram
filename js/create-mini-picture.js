/* eslint-disable prefer-const */
import {openBigPicture} from './open-big-picture.js';
import { getData } from './api.js';
import { debounce, getRandomArrayOfNumbers } from './util.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesBlock = document.querySelector('.pictures');
const filters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

const createMiniPicture = (photo, fragment) => {
  const pictureNewTemplate = pictureTemplate.cloneNode(true);
  const pictureImage = pictureNewTemplate.querySelector('.picture__img');
  let pictureLikes = pictureNewTemplate.querySelector('.picture__likes');
  let pictureComments = pictureNewTemplate.querySelector('.picture__comments');

  pictureImage.src = photo.url;
  pictureLikes.textContent = photo.likes;
  pictureComments.textContent = photo.comments.length;
  fragment.append(pictureNewTemplate);

  openBigPicture(pictureNewTemplate, photo);

  return pictureNewTemplate;
};

const createMiniPictures = (photosArray) => {
  const fragment = document.createDocumentFragment();

  photosArray.forEach((photo) => {
    createMiniPicture(photo, fragment);
  });

  picturesBlock.append(fragment);
};

const compareComments = (photoA, photoB) => {
  const commentsA = photoA.comments.length;
  const commentsB = photoB.comments.length;

  return commentsB - commentsA;
};

const filterPhotos = (evt, photos) => {
  const miniPictures = document.querySelectorAll('.picture');
  miniPictures.forEach((miniPicture) => miniPicture.remove());

  if (evt.target.id === 'filter-default') {
    createMiniPictures(photos);
  }

  if (evt.target.id === 'filter-random') {
    const fragment = document.createDocumentFragment();

    getRandomArrayOfNumbers(photos.length - 1).slice(0, 10)
      .forEach((number) => {
        createMiniPicture(photos[number], fragment);
      });

    picturesBlock.append(fragment);
  }

  if (evt.target.id === 'filter-discussed') {
    const sortPhotos = photos.slice().sort(compareComments);
    createMiniPictures(sortPhotos);
  }
};

const showFilters = (photos, cb) => {
  filters.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', (evt) => {
    filtersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');

    evt.target.classList.add('img-filters__button--active');
    cb(evt, photos);
  });
};

getData((photos) => {
  createMiniPictures(photos);
  showFilters(photos,
    debounce(
      (evt) => filterPhotos(evt, photos),
      500
    ));
});

export {createMiniPictures};
