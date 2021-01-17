const mongoose = require("mongoose");

module.exports =  async () => {
  try {
    const database = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log(
      `MongoDb database with the host (${database.connection.host}) is connected`
    );
  } catch (error) {
    console.log(error);
  }
};