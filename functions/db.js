const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const getClient = async () => {
    mongoose
        .connect(process.env.MONGO_CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Connected to the database!");
        })
        .catch(err => {
            console.log("Cannot connect to the database!", err);
            process.exit(); 
        });
};

module.exports = getClient;