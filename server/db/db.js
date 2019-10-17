const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/devdb", (err) => {
    console.error(err);

});