const mongoose = require('mongoose');    
const mongoURI = "mongodb+srv://admin:admin@blogs.3jhgc.mongodb.net/test";
mongoose.Promise = global.Promise;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};
mongoose.connect(mongoURI, options);

const db = mongoose.connection;
module.exports = db