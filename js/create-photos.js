/* eslint-disable arrow-body-style */
/* eslint-disable prefer-template */
import {getRandomArrayOfNumbers, getRandomPositiveInteger} from './util.js';

const DESCRIPTIONS = ['Моя кошка', 'Моя cобака','Я в отпуске','Очень странное фото','Очень длинное описание к фотографии'];
const MESSAGES = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Вася', 'Иван','Хуан Себастьян','Мария','Кристоф','Виктор','Юлия','Люпита','Вашингтон'];
const PHOTO_PAGES_COUNT = 25;

const ID_PHOTO_ARRAY = getRandomArrayOfNumbers(25);
const URL_ARRAY = getRandomArrayOfNumbers(25);
const ID_COMMENT_ARRAY = getRandomArrayOfNumbers(200);

function createIdGenerator () {
  let lastGenerateId = -1;

  return function () {
    lastGenerateId += 1;
    return lastGenerateId;
  };
}

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();
const generateURLId = createIdGenerator();

const createMessage = () => {
  if (getRandomPositiveInteger(0,1)) {
    return MESSAGES[getRandomPositiveInteger(0,5)] + ' ' + MESSAGES[getRandomPositiveInteger(0,5)];
  }
  return MESSAGES[getRandomPositiveInteger(0,5)];
};

const createComment = () => {
  return {
    id: ID_COMMENT_ARRAY[generateCommentId()],
    avatar: 'img/avatar-' + getRandomPositiveInteger(1,6) + '.svg',
    message: createMessage(),
    name: NAMES[getRandomPositiveInteger(0, 8)]
  };
};

const createComments = () => {
  const commentsArray = [];
  for (let i = 0; i < getRandomPositiveInteger(1, 100); i++) {
    commentsArray.push(createComment());
  }
  return commentsArray;
};

const createPhoto = () => {
  return {
    id: ID_PHOTO_ARRAY[generatePhotoId()],
    url: 'photos/' + URL_ARRAY[generateURLId()] + '.jpg',
    description: DESCRIPTIONS[getRandomPositiveInteger(0,4)],
    likes: getRandomPositiveInteger(15, 200),
    comments: createComments()
  };
};

const createPhotos = () => Array.from({length: PHOTO_PAGES_COUNT}, createPhoto);

export {createPhotos};
