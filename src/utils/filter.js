import {FilterType} from './../consts';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => point.dateFrom >= new Date() || (point.dateFrom <= new Date() && point.dateTo >= new Date())),
  [FilterType.PAST]: (points) => points.filter((point) => point.dateTo < new Date() || (point.dateFrom <= new Date() && point.dateTo >= new Date())),
};
