const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const functions = require("firebase-functions");

mongoose.connect(functions.config().studybuddy.mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
    .once("open", () => console.log("Connected!"))
    .on("error", (error) => {
      console.warn("Error : ", error);
    });
// Called hooks which runs before something.
// beforeEach((done) => {
//   mongoose.connection.collections.pokemons.drop(() => {
//     // this function runs after the drop is completed
//     done(); // go ahead everything is done now.
//   });
// });
