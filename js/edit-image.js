const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview').querySelector('img');
const effectsList = document.querySelector('.effects__list');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');

let currentScaleValue = 50;

const onButtonSmallerClick = () => {
  if (currentScaleValue !== 0) {
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

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower'
});

effectSlider.classList.add('hidden');

const onEffectsListChange = (evt) => {
  image.className = '';
  image.classList.add(`effects__preview--${evt.target.value}`);

  if (effectSlider.classList.contains('hidden')) {
    effectSlider.classList.remove('hidden');
  }

  // eslint-disable-next-line no-constant-condition
  if (evt.target.value === 'sepia' || 'chrome') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    });
  }

  if (evt.target.value === 'marvin') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1
    });
  }

  if (evt.target.value === 'phobos') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1
    });
  }

  if (evt.target.value === 'heat') {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1
    });
  }

  effectSlider.noUiSlider.on('update', () => {
    effectLevel.value = effectSlider.noUiSlider.get();

    if (evt.target.value === 'heat') {
      image.style.filter = `brightness(${effectSlider.noUiSlider.get()})`;
    }

    if (evt.target.value === 'chrome') {
      image.style.filter = `grayscale(${effectSlider.noUiSlider.get()})`;
    }

    if (evt.target.value === 'marvin') {
      image.style.filter = `invert(${effectSlider.noUiSlider.get()}%)`;
    }

    if (evt.target.value === 'phobos') {
      image.style.filter = `blur(${effectSlider.noUiSlider.get()}px)`;
    }

    if (evt.target.value === 'sepia') {
      image.style.filter = `sepia(${effectSlider.noUiSlider.get()})`;
    }
  });

  if (evt.target.value === 'none') {
    effectSlider.classList.add('hidden');
    image.style.filter = '';
  }
};

effectsList.addEventListener('change', onEffectsListChange);
buttonBigger.addEventListener('click', onButtonBiggerClick);
buttonSmaller.addEventListener('click', onButtonSmallerClick);

export {currentScaleValue};
