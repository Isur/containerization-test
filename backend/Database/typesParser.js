const precisionLevelCalculate = (precision) => {
  const levels = ["years", "months", "days", "hours", "minutes", "seconds", "milliseconds"];
  return levels.indexOf(precision);
};

const postgresIntervalToString = (pgInterval,
                                         precision) => {
  const { years, months, days, hours, minutes, seconds, milliseconds } = pgInterval;
  let string = "";
  const precisionLevel = precisionLevelCalculate(precision);
  if(years) string += `${years} years `;
  if(months && precisionLevel > 0) string += `${months} months `;
  if(days && precisionLevel > 1) string += `${days} days `;
  if(hours && precisionLevel > 2) string += `${hours} hours `;
  if(minutes && precisionLevel > 3) string += `${minutes} minutes `;
  if(seconds && precisionLevel > 4) string += `${seconds} seconds `;
  if(milliseconds && precisionLevel > 5) string += `${milliseconds} milliseconds `;

  return string.slice(0, -1);
};

exports.module = { postgresIntervalToString }