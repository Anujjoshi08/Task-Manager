"use strict";

const mongoose = require("mongoose");
const User = require("./user");
const Task = require("./task");

const connectDb = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not set in environment variables");
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
};

module.exports = {
  mongoose,
  connectDb,
  User,
  Task,
};
