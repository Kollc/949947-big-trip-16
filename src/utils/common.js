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

export const getTypesTimeDuration = (points, types) => {
  const itemsTimes = [];
  let time = 0;
  types.forEach((type) => {
    points.forEach((point) => {
      if (point.type === type) {
        time += (dayjs(point.dateTo).diff(dayjs(point.dateFrom)));
      }
    });
    itemsTimes.push(Math.round(time));
    time = 0;
  });
  return itemsTimes;
};

export const getTypesMoney = (points, types) => {
  const itemsCosts = [];
  let sum = 0;
  types.forEach((type) => {
    points.forEach((point) => {
      if (point.type === type) {
        sum += point.basePrice;
      }
    });
    itemsCosts.push(sum);
    sum = 0;
  });
  return itemsCosts;
};

export const getTypesCount = (points, types) => {
  const itemsTypesCount = [];
  let count = 0;
  types.forEach((type) => {
    points.forEach((point) => {
      if (point.type === type) {
        count++;
      }
    });
    itemsTypesCount.push(count);
    count = 0;
  });
  return itemsTypesCount;
};

export const sortByPrice = (pointOne, pointTwo) => pointTwo.basePrice - pointOne.basePrice;
