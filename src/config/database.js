const mongoosedb = require("mongoose");

mongoosedb
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((e) => {
    console.log("no connection " + e);
  });
