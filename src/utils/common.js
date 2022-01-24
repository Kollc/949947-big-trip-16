import dayjs from 'dayjs';

export const sortByTime = (pointOne, pointTwo) => {
  const pointOneDuration = dayjs.duration(dayjs(pointOne.dateTo).diff(dayjs(pointOne.dateFrom))).asSeconds();
  const pointTwoDuration = dayjs.duration(dayjs(pointTwo.dateTo).diff(dayjs(pointTwo.dateFrom))).asSeconds();
  return pointTwoDuration - pointOneDuration;
};

export const sortByPrice = (pointOne, pointTwo) => pointTwo.basePrice - pointOne.basePrice;
