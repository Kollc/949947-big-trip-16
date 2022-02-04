const POINT_TYPE_LIST = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const AUTHORIZATION = 'Basic acsski7j4o93njjsi';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const SortType = {
  DEFAULT: 'default',
  BY_PRICE: 'by-price',
  BY_TIME: 'by-time',
};

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
  INIT: 'INIT',
  OFFERS: 'OFFERS',
  DESTINATIONS: 'DESTINATIONS',
};

const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PAST: 'Past',
};

const DEFAULT_TYPE = 'taxi';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const MenuItem = {
  TABLE: 'Table',
  STATS: 'Stats',
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

const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

const SHAKE_ANIMATION_TIMEOUT = 600;

const IS_NEW_POINT = true;

export {
  POINT_TYPE_LIST,
  SortType,
  Mode,
  UserAction,
  UpdateType,
  FilterType,
  DEFAULT_TYPE,
  MenuItem,
  ChartConfigs,
  BAR_HEIGHT,
  Method,
  State,
  SHAKE_ANIMATION_TIMEOUT,
  IS_NEW_POINT,
  END_POINT,
  AUTHORIZATION
};
