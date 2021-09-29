const mongoose = require('mongoose');

//DB string URI
const uri = process.env.MONGO_URI

//establish DB connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // After 5sec Timeout.
})

const connection = mongoose.connection;

module.exports = connection;