### Module:

- A reusable block of code whose existence does not accidentally impact other code

-------

### First-class function
- Everything you can do with other types you can do with functions
- You can use functions like strings, numbers, etc. (i.e. pass them around, set variables equal to them, put them in arrays, and more)


-----
- **require** is a function, that you pass a 'path' too
- **module.exports** si what the require function returns
- this works because **your code is actually wrapped in a function** that is given these things as function parameters
-----

### Revealing module pattern
- Exposing only the properties and methods you want via an returned object
- A very common and clean way to structure and protect code within modules

------

### Inherits

```js
var util = require('util');

function Greetr() {
  this.greeting = "Hello world!"
}

util.inherits(Greetr, EventEmitter);

Greetr.prototype.greet = function(data) {
  console.log(this.greeting + ": " + data);
  this.emit('greet');
}

var greeter1 = new Greetr();

greeter1.on('greet', function(data) {
  console.log('Someone greeted!: ' + data);
})

greeter1.greet('Tony');


// ===============
class Greetr extends EventEmitter {
  constructor() {
    super();
    this.greeting = "hello world!";
  }

  greet(data) {
    console.log(`${this.greeting }: ${data}`);
    this.emit('greet', data);
  }
}

var greeter1 = new Greetr();
greeter1.greet()

```


-----

### Non-Blocking
- Doing other thigns without stoping your programming from running
- This is made possible by Node's doing things asynchronously.


--------
### Buffer
- A temporary holding spot for data being moved from one place to another
- Intentionally limited in size.

### Stream
- A Sequence of data made available over time.
- Pieces of data that eventually combine into a whole.


----
### Binary Data
- Data stored in binary (Sets of 1s and 0s)
- The core of the match that computers are based on.
- Each one or zero is called a "bit" or "binary digit".

----
### Character Set
- A Representation of characters as numbers

### Character encoding
- How characters are stored in binary
- The numbers (or code points) are converted and stored in binary.
------

### Error-First Callback
- Callbacks take an error object as their first parameter
- null if no error, otherwise will contain an object defining the error.
- this is a standard so we know in what order to place our parameters for our callbacks.


-----

### Chunk
- A Piece of data being sent through a stream.
- Data is split in 'chunks' and streamed.

-----

### Abstract (Base) class
- A type of constructor you never work directly with, but inherit from.
- We create new custom objects which inherit from the abstract base class.

------

### Pipe
- Connecting two streams by writing to one stream what is being read from another
- In Node you pipe from a Readable stream to a Writeable stream.
