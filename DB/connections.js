import mongoose from "mongoose";

export const connectionDB = async () => {
  return await mongoose
    .connect('mongodb://localhost:27017/tokens')
    .then((res) => {
      console.log("DB Conncted successfully");
    })
    .catch((err) =>
      console.log({ message: "Fail to connecto to DB", error: err })
    );
};
