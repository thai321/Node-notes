function Greetr() {
  this.greeting = 'Hello world 4!';
  this.greet = function() {
    console.log(this.greeting);
  };
}

module.exports = Greetr;
