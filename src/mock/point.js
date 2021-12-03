import dayjs from 'dayjs';
import {
  CITY_LIST,
  POINT_TYPE_LIST,
  MAX_COUNT_DESCRIPTION,
  DESTINATION_DESCRIPTION,
} from './../consts';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomDescription = (descriptions, count) => {
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(descriptions[getRandomInteger(0, descriptions.length - 1)]);
  }

  return result.join('');
};

const getPhotoDestination = (number) => (`http://picsum.photos/248/152?r${number}`);

const generatePhotoDestination = () => {
  const photoUrl = getPhotoDestination(getRandomInteger(1, 20));

  return {
    'src': photoUrl,
    'description': DESTINATION_DESCRIPTION[getRandomInteger(1, DESTINATION_DESCRIPTION.length - 1)]
  };
};

const getPhotoDestinationObjList = (count) => {
  const pictures = [];
  for (let i = 0; i < count; i++) {
    pictures.push(generatePhotoDestination());
  }

  return pictures;
};

const getRandomCity = () => (CITY_LIST[getRandomInteger(0, CITY_LIST.length - 1)]);

const getRandomType = () => (POINT_TYPE_LIST[getRandomInteger(0, POINT_TYPE_LIST.length - 1)]);

const generateDestination = () => ({
  'description': getRandomDescription(DESTINATION_DESCRIPTION, getRandomInteger(0, MAX_COUNT_DESCRIPTION)),
  'name': getRandomCity(),
  'pictures': getPhotoDestinationObjList(getRandomInteger(1, 5))
});

const getDate = (fromDate = true) => {
  const maxDaysGap = fromDate ? 0 : 5;
  const daysGap = getRandomInteger(maxDaysGap, 0);

  const maxHoursGap = fromDate ? -2 : 2;
  const hoursGap = getRandomInteger(maxHoursGap, 0);

  const maxMinutesGap = fromDate ? 0 : 60;
  const minutesGap = getRandomInteger(maxMinutesGap, 0);


  return dayjs().add(daysGap, 'days').add(hoursGap, 'hours').add(minutesGap, 'minutes').toDate();
};

const createOfferObj = (id) => ({
  'id': id,
  'title': 'Upgrade to a business class',
  'price': getRandomInteger(10, 260)
});

const getOffersList = () => {
  const count = getRandomInteger(1, 5);
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(createOfferObj(i));
  }
  return result;
};
const generateOffer = (type) => ({
  'type': type,
  'offers': getOffersList()
});

const getPointObj = (id) => {
  const currentType = getRandomType();
  return {
    id,
    'basePrice': getRandomInteger(1100, 11200),
    'dateFrom': getDate(),
    'dateTo': getDate(false),
    'destination': generateDestination(),
    'isFavorite': Boolean(getRandomInteger()),
    'offers': generateOffer(currentType),
    'type': currentType
  };
};

const getPoints = () => {
  const result = [];

  for (let i = 0; i < 20; i++) {
    result.push(getPointObj(i));
  }

  return result;
};

export {
  getPoints
};
