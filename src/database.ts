import mongoose, { Mongoose } from "mongoose";
import { db } from "@src/config";

export const connect = async (): Promise<Mongoose> => {
  return await mongoose.connect(db.URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const close = (): Promise<void> => {
  return mongoose.connection.close();
};
