var Todos = require('../models/todoModel');

module.exports = function(app) {
  app.get('/api/setupTodos', function(req, res) {
    // seed database
    var starterTodos = [
      {
        username: 'test1',
        todo: 'Buy milk',
        isDone: false,
        hasAtttachment: false
      },
      {
        username: 'test2',
        todo: 'Feed dog',
        isDone: false,
        hasAtttachment: false
      },
      {
        username: 'test2',
        todo: 'Learn Node',
        isDone: false,
        hasAtttachment: false
      }
    ];

    Todos.create(starterTodos, function(err, results) {
      res.send(results);
    });
  });
};
