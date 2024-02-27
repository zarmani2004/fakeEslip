const {DateTime} = require('luxon')

function getCurrentDateInTimeZone(timeZone) {
  return DateTime.now().setZone(timeZone).toFormat('dd/MM/yyyy');
}

function getCurrentTimeInTimeZone(timeZone) {
  return DateTime.now().setZone(timeZone).toFormat('HH:mm:ss');
}

function getTime () {
  const time = new Date()
  return new Intl.DateTimeFormat('en-GB', {
    timeStyle: 'long',
    timeZone: 'Asia/Yangon'
}).format(time).slice(0,8)
}

// Example usage for GMT+6:30
const timeZone = 'Africa/Accra'; // Using the IANA time zone name for GMT+6:30
const formattedTime = getCurrentTimeInTimeZone(timeZone);
console.log(formattedTime);

// Example usage for GMT+6:30
const formattedDate = getCurrentDateInTimeZone(timeZone);
console.log(formattedDate);

module.exports = {
  getDate: getCurrentDateInTimeZone,
  getTime
}