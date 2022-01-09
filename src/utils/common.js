import dayjs from 'dayjs';

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const sortByTime = (pointOne, pointTwo) => {
  const pointOneDuration = dayjs.duration(pointOne.dateTo.diff(pointOne.dateFrom)).asSeconds();
  const pointTwoDuration = dayjs.duration(pointTwo.dateTo.diff(pointTwo.dateFrom)).asSeconds();
  return pointTwoDuration - pointOneDuration;
};

export const sortByPrice = (pointOne, pointTwo) => pointTwo.basePrice - pointOne.basePrice;
