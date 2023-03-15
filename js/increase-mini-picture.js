/* eslint-disable prefer-arrow-callback */
const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImage = bigPictureBlock.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPictureBlock.querySelector('.likes-count');
const bigPictureComments = bigPictureBlock.querySelector('.comments-count');
const commentsList = bigPictureBlock.querySelector('.social__comments');
const commentsListItem = bigPictureBlock.querySelector('.social__comment');
const commentsCount = bigPictureBlock.querySelector('.social__comment-count');
const commentsLoader = bigPictureBlock.querySelector('.comments-loader');
const bigPictureCloseButton = bigPictureBlock.querySelector('.big-picture__cancel');
const body = document.body;

const increaseMiniPicture = (miniPicture, photo) => {
  const bigPictureDescription = bigPictureBlock.querySelector('.social__caption');

  miniPicture.addEventListener('click', function () {
    bigPictureImage.src = photo.url;
    bigPictureLikes.textContent = photo.likes;
    bigPictureComments.textContent = photo.comments.length;
    commentsCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');
    bigPictureDescription.textContent = photo.description;

    // eslint-disable-next-line arrow-parens
    photo.comments.forEach(comment => {
      const commentsListNewItem = commentsListItem.cloneNode(true);
      const commentsListItemImage = commentsListNewItem.querySelector('.social__picture');
      const commentsListItemText = commentsListNewItem.querySelector('.social__text');
      commentsListItemImage.src = comment.avatar;
      commentsListItemImage.alt = comment.name;
      commentsListItemText.textContent = comment.message;
      commentsList.append(commentsListNewItem);
    });

    bigPictureBlock.classList.remove('hidden');
  });
};

bigPictureCloseButton.addEventListener('click', function () {
  bigPictureBlock.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    bigPictureBlock.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

export {increaseMiniPicture};
