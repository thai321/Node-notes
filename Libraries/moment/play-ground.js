const moment = require('moment');
const now = moment();
console.log(now);

const day = moment('2017-02-27');
console.log(day);

let test = moment('20130208');
console.log(test);

console.log(moment('2013W065'));

test = moment()
  .add(7, 'days')
  .add(1, 'months'); // with chaining

console.log(test);

var start = moment().startOf('week');
var end = moment().endOf('week');
// var actual = moment().min(start).max(end);
console.log(end);

console.log('Zone: ', moment().utcOffset());

console.log('moment().format(): ', moment().format());
console.log(
  `moment().format("dddd, MMMM Do YYYY, h:mm:ss a"): `,
  moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
);

var beginningTime = moment('20130208');
var endTime = moment('2017-02-27');
console.log('beginningTime: ', beginningTime);
console.log('endTime: ', endTime);
console.log(beginningTime > endTime);
