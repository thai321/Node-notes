async = require('async');

// 1st para in async.each() is the array of items
async.each(
  [1, 2, 3],
  // 2nd param is the function that each item is passed to
  function(item, callback) {
    // Call an asynchronous function, often a save() to DB
    item.someAsyncCall(function() {
      // Async call is done, alert via callback
      callback();
    });
  },
  // 3rd param is the function to call when everything's done
  function(err) {
    // All tasks are done now
    doSomethingOnceAllAreDone();
  }
);
