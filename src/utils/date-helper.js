import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const convertDateHourseMinutes = (date) => dayjs(date).format('HH:mm');

const formatedDate = (date) => {
  const result = [];

  const dateValues = new Map([
    ['D', date.days()],
    ['H', date.hours()],
    ['M', date.minutes()],
  ]);

  dateValues.forEach((value, key) => {
    if (value > 0 || key === 'M') {
      result.push(value + key);
    }
  });

  return result.join(' ');
};

const getDurationDate = (from, to) => {
  const fromDate = dayjs(from);
  const toDate = dayjs(to);

  dayjs.extend(duration);
  const durationDate = dayjs.duration(toDate.diff(fromDate));

  return formatedDate(durationDate);
};

const dateYearsMonthDay = (date) => dayjs(date).format('YYYY-MM-DD');
const dateMonthDay = (date) => dayjs(date).format('MMM-DD');

export {
  convertDateHourseMinutes,
  getDurationDate,
  dateYearsMonthDay,
  dateMonthDay,
  formatedDate
};
