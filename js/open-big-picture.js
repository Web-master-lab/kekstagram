/* eslint-disable prefer-arrow-callback */
import { isSomeKey } from './util.js';

const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImage = bigPictureBlock.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPictureBlock.querySelector('.likes-count');
const commentsCount = bigPictureBlock.querySelector('.comments-count');
const commentsList = bigPictureBlock.querySelector('.social__comments');
const commentsListItem = bigPictureBlock.querySelector('.social__comment');
const commentsLoader = bigPictureBlock.querySelector('.comments-loader');
const bigPictureCloseButton = bigPictureBlock.querySelector('.big-picture__cancel');
const bigPictureDescription = bigPictureBlock.querySelector('.social__caption');
const commentsShowCount = bigPictureBlock.querySelector('.comments-show-count');
const body = document.body;

const onCommentsLoaderClick = () => {
  const comments = commentsList.children;
  const commentsHiddenLength = commentsList.querySelectorAll('.hidden').length;

  for (let i = comments.length - commentsHiddenLength; i < comments.length - commentsHiddenLength + 5; i++) {
    comments[i].classList.remove('hidden');
    commentsShowCount.textContent = commentsList.children.length - commentsList.querySelectorAll('.hidden').length;

    if (commentsList.querySelectorAll('.hidden').length === 0) {
      commentsLoader.classList.add('hidden');
      break;
    }
  }
};

commentsLoader.addEventListener('click', onCommentsLoaderClick);

const createComments = (photo) => {
  photo.comments.forEach((comment) => {
    const commentsListNewItem = commentsListItem.cloneNode(true);
    const commentsListItemImage = commentsListNewItem.querySelector('.social__picture');
    const commentsListItemText = commentsListNewItem.querySelector('.social__text');

    commentsListItemImage.src = comment.avatar;
    commentsListItemImage.alt = comment.name;
    commentsListItemText.textContent = comment.message;

    if (commentsList.childElementCount >= 5) {
      commentsListNewItem.classList.add('hidden');
    }

    commentsList.append(commentsListNewItem);
  });
};

const closeBigPicture = () => {
  bigPictureBlock.classList.add('hidden');
  body.classList.remove('modal-open');

  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onBigPictureBlockEscKeydown);
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
};

const onBigPictureBlockEscKeydown = (evt) => {
  if (isSomeKey(evt, 'Escape')) {
    closeBigPicture();
  }
};

const openBigPicture = (miniPicture, photo) => {
  miniPicture.addEventListener('click', () => {
    bigPictureImage.src = photo.url;
    bigPictureLikes.textContent = photo.likes;
    bigPictureDescription.textContent = photo.description;
    commentsList.innerHTML = '';

    createComments(photo);

    commentsCount.textContent = commentsList.children.length;
    commentsShowCount.textContent = commentsList.children.length - commentsList.querySelectorAll('.hidden').length;

    if (commentsList.querySelectorAll('.hidden').length === 0) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }

    body.classList.add('modal-open');
    bigPictureBlock.classList.remove('hidden');

    bigPictureCloseButton.addEventListener('click', closeBigPicture);

    document.addEventListener('keydown', onBigPictureBlockEscKeydown);
  });
};

export {openBigPicture};
