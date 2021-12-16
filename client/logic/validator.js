export const validateInputData = ({
  age,
  gender,
  locationName,
  locationType,
  occupation,
  timeFrom,
  timeTo
}) => {
  if (gender != 'Male' && gender != 'Female') {
    throw 'Please chooses the valid gender';
  }

  if (Number(age) > 100 || Number(age) < 0 || !Number.isInteger(Number(age))) {
    throw 'Please input age in range (0,100) and should be integer number';
  }

  if (occupation === '') {
    throw 'Please specify the occupation';
  }

  if (locationType === '') {
    throw 'Please specify the location type';
  }

  if (locationType === 'INDOOR' || locationType === 'OUTDOOR') {
    if (locationName == '') {
      throw 'Please specify the location name';
    }
  }

  if (timeFrom === '') {
    throw 'Please specify the time from';
  }

  if (timeTo === '') {
    throw 'Please specify the time to';
  }
};

export const convertTimeToUnix = (timeFrom, timeTo) => {
  var date = timeFrom.substring(0, 10);

  timeFrom = new Date(timeFrom).getTime();
  timeTo = new Date(date + 'T' + timeTo).getTime();

  if (timeFrom > timeTo) {
    throw 'timeFrom should be less than timeTo';
  }

  return [timeFrom, timeTo];
};
