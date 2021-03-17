import { trimUpperCase } from './string';

/**
   * [getEpochTime this is to get epoch time relative to current time, this can
   * be addition of subtraction of seconds,minutes,hours,days,months,years
   * basis a positive or negative value respectivley]
   * @param  {String} typeOfValue [description]
   * @param  {Number} value   [positive or negative to add or delete the value to current date]
   * @return {[epoch time]}   [description]
   */
export const getEpochTime = (typeOfValue = '', value = 0) => {
  let covertedTime = 0;
  const currentDate = new Date();
  switch (trimUpperCase(typeOfValue)) {
    case 'SECOND':
      covertedTime = (value > 0 ? currentDate.setSeconds(currentDate.getSeconds() + value)
        : currentDate.setSeconds(currentDate.getSeconds() - value));
      break;
    case 'MINUTE':
      covertedTime = (value > 0 ? currentDate.setMinutes(currentDate.getMinutes() + value)
        : currentDate.setMinutes(currentDate.getMinutes() - value));
      break;
    case 'HOUR':
      covertedTime = (value > 0 ? currentDate.setHours(currentDate.getHours() + value)
        : currentDate.setHours(currentDate.getHours() - value));
      break;
    case 'DAY':
      covertedTime = (value > 0 ? currentDate.setDate(currentDate.getDate() + value)
        : currentDate.setDate(currentDate.getDate() - value));
      break;
    case 'MONTH':
      covertedTime = (value > 0 ? currentDate.setMonth(currentDate.getMonth() + value)
        : currentDate.setMonth(currentDate.getMonth() - value));
      break;
    case 'YEAR':
      covertedTime = (value > 0 ? currentDate.setFullYear(currentDate.getFullYear() + value)
        : currentDate.setYear(currentDate.getYear() - value));
      break;
    default:
      covertedTime = new Date().getTime();
      break;
  }
  return covertedTime;
};
