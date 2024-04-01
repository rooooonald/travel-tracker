export const checkEmpty = (value) => value.trim().length !== 0;

export const checkChar = (value, options) => {
  return value.trim().length !== 0 && value.trim().length <= options.maxChar;
};

export const checkDate = (value, options) => {
  if (!checkEmpty(value)) {
    return false;
  }

  const dateFromTimestamp = new Date(options.dateFrom).getTime();
  const dateToTimestamp = new Date(value).getTime();

  if (dateToTimestamp < dateFromTimestamp) {
    return false;
  }

  return true;
};

export const checkFlightNum = (number) => {
  if (!checkEmpty(number)) {
    return false;
  }

  const regex = /^[A-Za-z]{2}\d{1,4}$/;

  if (!regex.test(number)) {
    return false;
  }

  return true;
};

export const checkAmount = (number) => {
  if (!checkEmpty(number)) {
    return false;
  }

  if (+number <= 0) {
    return false;
  }

  return true;
};
