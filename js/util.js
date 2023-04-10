const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayOfNumbers = (amountIndex) => {
  const RANDOM_NUMBERS_ARRAY = [];
  while (RANDOM_NUMBERS_ARRAY.length < amountIndex) {
    const number = getRandomPositiveInteger(1, amountIndex);
    if(RANDOM_NUMBERS_ARRAY.indexOf(number) === -1) {RANDOM_NUMBERS_ARRAY.push(number);}
  }
  return RANDOM_NUMBERS_ARRAY;
};

const isSomeKey = (evt, keyName) => evt.key === keyName;

const checkStringLength = (string, maxLength) => string.length <= maxLength;

export {getRandomArrayOfNumbers, getRandomPositiveInteger, checkStringLength, isSomeKey};
