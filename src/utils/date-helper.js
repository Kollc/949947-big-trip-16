import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const convertDateHourseMinutes = (date) => dayjs(date).format('HH:mm');

const getDurationDate = (from, to) => {
  const fromDate = dayjs(from);
  const toDate = dayjs(to);
  const result = [];

  dayjs.extend(duration);
  const durationDate = dayjs.duration(fromDate.diff(toDate));

  const dateValues = new Map([
    ['D', durationDate.days()],
    ['H', durationDate.hours()],
    ['M', durationDate.minutes()],
  ]);

  dateValues.forEach((value, key) => {
    if (value > 0 || key === 'M') {
      result.push(value + key);
    }
  });

  return result.join(' ');
};

const dateYearsMonthDay = (date) => dayjs(date).format('YYYY-MM-DD');
const dateMonthDay = (date) => dayjs(date).format('MMM-DD');

export {
  convertDateHourseMinutes,
  getDurationDate,
  dateYearsMonthDay,
  dateMonthDay,
};
