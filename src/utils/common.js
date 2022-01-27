import dayjs from 'dayjs';
import { DEFAULT_TYPE } from '../consts';

export const sortByTime = (pointOne, pointTwo) => {
  const pointOneDuration = dayjs.duration(dayjs(pointOne.dateTo).diff(dayjs(pointOne.dateFrom))).asSeconds();
  const pointTwoDuration = dayjs.duration(dayjs(pointTwo.dateTo).diff(dayjs(pointTwo.dateFrom))).asSeconds();
  return pointTwoDuration - pointOneDuration;
};

export const changeInMapTitleToKey = (mapList) => {
  const newMapList = new Map();
  mapList.forEach(({title, id, price}) => {
    newMapList.set(title, {id, price});
  });

  return newMapList;
};

export const getNewPoint = (destination, offers) => ({
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination,
  offers,
  type: DEFAULT_TYPE,
});

export const sortByPrice = (pointOne, pointTwo) => pointTwo.basePrice - pointOne.basePrice;
