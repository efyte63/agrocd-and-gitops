import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

// MongoDB Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

// MongoDB Model
const UserModel = mongoose.model("User", userSchema);

// Routes
app.post("/post", async (req, res) => {
  try {
    const { username } = req.body;

    const user = await UserModel.create({
      username: username,
    });

    res.status(201).json({
      msg: "User created",
      user: user,
    });
  } catch (error) {
    console.error("Error creating user:", error);

    res.status(500).json({
      msg: "Failed to create user",
    });
  }
});

app.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();

    res.json({
      users: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    res.status(500).json({
      msg: "Failed to fetch users",
    });
  }
});

// Start application
async function startServer() {
  try {
    await mongoose.connect(
      "mongodb://databaseservice.mongodb.svc.cluster.local:27017/mydb",
    );
    console.log("MongoDB connected successfully");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.error("Unable to connect to MongoDB:", error);

    // Stop the application if MongoDB connection fails
    process.exit(1);
  }
}

startServer();
