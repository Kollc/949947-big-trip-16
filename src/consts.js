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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PAST: 'Past',
};

const DEFAULT_TYPE = 'taxi';

const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats'
};

const ChartConfigs = {
  TYPE: 'horizontalBar',
  BACKGROUND_COLOR: '#ffffff',
  BAR_HEIGHT: 55,
  FONT_SIZE: 13,
  TITLE_FONT_SIZE: 23,
  MONEY_CHART_TITLE: 'MONEY',
  TRANSPORT_CHART_TITLE: 'TYPE',
  TIME_SPEND_CHART_TITLE: 'TIME-SPEND',
  COLOR: '#000000',
  BAR_THICKNESS: 44,
  PADDING: 5,
  MIN_BAR_LENGTH: 50,
  PADDING_LEFT: 35,
  ANCHOR_DATA: 'start',
  ANCHOR_DATA_LABELS: 'end',
  ANCHOR: 'end',
  ALIGN: 'start',
  POSITION: 'left',
};

const BAR_HEIGHT = 55;


export {
  CITY_LIST,
  POINT_TYPE_LIST,
  MAX_COUNT_DESCRIPTION,
  DESTINATION_DESCRIPTION,
  OFFER_TITLES,
  POINT_COUNT,
  SortType,
  Mode,
  UserAction,
  UpdateType,
  FilterType,
  DEFAULT_TYPE,
  MenuItem,
  ChartConfigs,
  BAR_HEIGHT
};
