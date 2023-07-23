import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Database connected successfully 🚀");
    });
  } catch (error) {
    console.log("Failed to connect to Database 🧨", error);
  }
}
