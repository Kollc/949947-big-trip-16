const POINT_TYPE_LIST = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITY_LIST = ['Рим', 'Марсель', 'Чикаго', 'Берлин', 'Брюга', 'Париж', 'Вена', 'Ватикан', 'Токио'];

const MAX_COUNT_DESCRIPTION = 5;
const DESTINATION_DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Nunc fermentum tortor ac porta dapibus.In rutrum ac purus sit amet tempus.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.Aliquam erat volutpat.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex,convallis sed finibus eget, sollicitudin eget ante.'
];

const OFFER_TITLES = ['Upgrade to a business class', 'Add luggage', 'Switch to comfort', 'Add meal', 'Choose seats', 'Travel by train'];

const SortType = {
  DEFAULT: 'default',
  BY_PRICE: 'by-price',
  BY_TIME: 'by-time',
};

const POINT_COUNT = 15;

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export {
  CITY_LIST,
  POINT_TYPE_LIST,
  MAX_COUNT_DESCRIPTION,
  DESTINATION_DESCRIPTION,
  OFFER_TITLES,
  POINT_COUNT,
  SortType,
  Mode,
};
