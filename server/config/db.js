const mongoose = require("mongoose");

async function dbConnect() {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);

    console.log(`Mongodb Connected ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = dbConnect;
