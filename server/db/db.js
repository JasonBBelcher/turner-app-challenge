const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGO_URI, (err) => {
    console.error(err);

});