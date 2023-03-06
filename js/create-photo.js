/* eslint-disable arrow-body-style */
/* eslint-disable prefer-template */
import {getRandomArrayOfNumbers, getRandomPositiveInteger} from './util.js';

const DESCRIPTIONS = ['Моя кошка', 'Моя cобака','Я в отпуске','Очень странное фото','Очень длинное описание к фотографии'];
const MESSAGES = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.','Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.','Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Вася', 'Иван','Хуан Себастьян','Мария','Кристоф','Виктор','Юлия','Люпита','Вашингтон'];
const PHOTO_PAGES_COUNT = 25;

const ID_PHOTO_ARRAY = getRandomArrayOfNumbers(25);
const URL_ARRAY = getRandomArrayOfNumbers(25);

let i = 0;
let j = 0;

const ID_COMMENT_ARRAY = getRandomArrayOfNumbers(200);
let k = 0;

const createMessage = () => {
  if (getRandomPositiveInteger(0,1)) {
    return MESSAGES[getRandomPositiveInteger(0,5)] + ' ' + MESSAGES[getRandomPositiveInteger(0,5)];
  }
  return MESSAGES[getRandomPositiveInteger(0,5)];
};

const createComment = () => {
  return {
    id: ID_COMMENT_ARRAY[k++],
    avatar: 'img/avatar-' + getRandomPositiveInteger(1,6) + '.svg',
    message: createMessage(),
    name: NAMES[getRandomPositiveInteger(0, 8)]
  };
};

const createPhoto = () => {
  return {
    id: ID_PHOTO_ARRAY[i++],
    url: 'photos/' + URL_ARRAY[j++] + '.jpg',
    description: DESCRIPTIONS[getRandomPositiveInteger(0,4)],
    likes: getRandomPositiveInteger(15, 200),
    comments: createComment()
  };
};

const createPhotos = () => Array.from({length: PHOTO_PAGES_COUNT}, createPhoto);

export {createPhotos};
