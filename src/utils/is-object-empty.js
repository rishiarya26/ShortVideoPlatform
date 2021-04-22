const isEmptyObject = obj => {
  let isEmpty;
  obj && Object.keys(obj).length === 0 ? isEmpty = true : isEmpty = false;
  return isEmpty;
};

export default isEmptyObject;
