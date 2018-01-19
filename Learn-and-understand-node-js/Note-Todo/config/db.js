var mongoose = require('mongoose');

const MONGO_URI = 'hello';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useMongoClient: true });

try {
  mongoose.connect(MONGO_URI, {
    useMongoClient: true
  });
} catch (err) {
  mongoose.createConnection(MONGO_URI, {
    useMongoClient: true
  });
}

mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', e => console.log('Error connecting to MongoLab:', e));
