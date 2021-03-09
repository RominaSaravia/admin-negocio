const mongodb = require("mongodb");
const mongoURL = "mongodb+srv://Romina:R25l1194s@proyectorol.rl6g4.gcp.mongodb.net/Proyecto?retryWrites=true&w=majority";
const mongoConfig = { useUnifiedTopology: true };

module.exports = {
  mongo: {
    db: mongodb,
    dbURL: mongoURL,
    mongoConfig: mongoConfig
  }
}