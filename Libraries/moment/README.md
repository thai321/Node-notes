## Moment


### Now
```js
const now = moment() // moment("2018-01-21T14:26:56.539")
```
-----
### String
- `moment(String)`
```js
const day = moment("2018-2-27") // moment("2017-02-27T00:00:00.000")
moment("20130208"); // moment("2013-02-08T00:00:00.000")

moment("not a real date").isValid(); // false
```

-----
### String + Format
```js
moment(String, String);
moment(String, String, String);
moment(String, String, Boolean);
moment(String, String, String, Boolean);

moment("12-25-1995", "MM-DD-YYYY");

moment("12-25-1995", "MM-DD-YYYY");
moment("12/25/1995", "MM-DD-YYYY");

moment("2010-10-20 4:30",       "YYYY-MM-DD HH:mm");   // parsed as 4:30 local time
moment("2010-10-20 4:30 +0000", "YYYY-MM-DD HH:mm Z"); // parsed as 4:30 UTC

moment('2016 is a date', 'YYYY-MM-DD').isValid() //true, 2016 was matched

moment("29-06-1995", ["MM-DD-YYYY", "DD-MM", "DD-MM-YYYY"]); // uses the last format
moment("05-06-1995", ["MM-DD-YYYY", "DD-MM-YYYY"]);          // uses the first format

```

------
### Manipulate

```js
moment().add(7, 'days').add(1, 'months'); // with chaining
moment().add({days:7,months:1}); // with object literal

moment().add(1000000, 'milliseconds'); // a million milliseconds
moment().add(360, 'days'); // 360 days
```


-----
### Display
```js
moment().format();                                // "2014-09-08T08:02:17-05:00" (ISO 8601)
moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
moment().format("ddd, hA");                       // "Sun, 3PM"
moment('gibberish').format('YYYY MM DD');         // "Invalid date"
```
