import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Database connected successfully 🚀");
    });

    connection.on("error", (err) => {
      console.log(
        "Mongo DB connection error. Please make sure it is running :🤯",
        err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Failed to connect to Database 🧨", error);
  }
}
