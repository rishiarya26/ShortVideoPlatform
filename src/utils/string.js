import { pipeAll } from './functional';

export const trimLastChar = str => (str ? str.substring(0, str.length - 1) : '');
export const trimFirstChar = str => (str ? str.substring(1, str.length) : '');
export const trimEdges = str => (str ? pipeAll(trimLastChar, trimFirstChar)(str) : '');
export const trimLowerCase = value => (value ? (value.replace(/ /g, '').toLowerCase() || '') : '');
export const trimSpace = value => (value ? (value.replace(/ /g, '') || '') : '');
export const trimUpperCase = value => (value ? (value.replace(/ /g, '').toUpperCase() || '') : '');
export const formatAmount = (amount = '') => `₹${amount.indexOf('.') >= 0
  ? amount.replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
  : amount.replace(/(\d)(?=(\d{2})+\d$)/g, '$1,')}`;
export const trimText = (str, charCount = 90) => (str.length > charCount ? `${str.substring(0, charCount)}...` : str);
const isFirstChar = (str = '', char) => (str.substr(0, 1) === char);
export const prependIfNot = (str, char) => (isFirstChar(str, char) ? str : `${char}${str}`);
export const doesStringMatch = (patterns = [], str = '') => (patterns.some(pattern => str.match(pattern)));
export const trimHash = (hashTag) =>{
  let trimmedHashtag = ''
  trimmedHashtag = hashTag?.replace(/^\#+|\#+$/g, '');
  return trimmedHashtag;
}
export const trimHashag = (hashTag) =>{
  let trimmedHashtag = ''
  trimmedHashtag = hashTag?.replace('#', '');
  return trimmedHashtag;
}
export const trimAtTheRate = (value) =>{
  let trimmedAtTheRate = ''
  trimmedAtTheRate = value?.replace('@', '');
  return trimmedAtTheRate;
}

export const compareArrays = (a,b)=>{
    return a.join() == b.join();
}