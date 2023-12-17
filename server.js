import express from "express";
import mongoose from "mongoose";
import Users from "./Models/users.js";
import bcrypt from "bcrypt";
import getUserById from "./routes/userRoutes/getUserById.js";

const saltRounds = 10;

const app = express();

app.use(express.json());

app.get("/getUserById/:id", getUserById);

app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await Users.find({});

    if (users.length === 0) {
      res.status(404).json({
        message: "No users found",
      });
      return;
    }

    res.status(200).json({
      message: "get all users successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error in getAllUsers", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    const body = req.body;

    const user = await Users.findOne({ email: body.email });

    if (user) {
      res.status(400).json({
        message: "User with the given email address already exists",
      });
      return;
    }

    const salt = await bcrypt.genSalt(Number(saltRounds));
    const hashPassword = await bcrypt.hash(body.password, salt);

    await Users.insertMany({ ...body, password: hashPassword });

    res.status(200).json({
      message: "user created successfully",
      data: body,
    });
  } catch (error) {
    console.error("Error in registering user", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/getUserByEmail/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;

    const user = await Users.findOne({ email: userEmail });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      message: "user successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error in get user by email", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.delete("/deleteUserByEmail/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;

    const results = await Users.deleteOne({
      email: userEmail,
    });
    if (results.deletedCount > 0) {
      res.status(200).json({
        message: "User deleted successfully",
        data: {
          email: userEmail,
        },
      });
      return;
    }
    res.status(404).json({
      message: "No user found to delete",
    });
  } catch (error) {
    console.error("Error in delete user by email", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.put("/updateUser", async (req, res) => {
  try {
    const userBody = req.body;

    const userUpdate = await Users.findOneAndUpdate(
      { email: userBody.email },
      { ...userBody }
    );

    if (!userUpdate) {
      res.status(404).json({
        message: "No user found to update",
      });

      return;
    }

    res.status(200).json({
      message: "user updated successfully",
      data: {
        newUserBody: userBody,
      },
    });
    console.log("userUpdate", userUpdate);
  } catch (error) {
    console.error("Error in update user", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to my server");
});

app.get("/verify", (req, res) => {
  res.send("Your server is running at http://localhost:5000/");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

mongoose
  .connect("mongodb://127.0.0.1:1701/MERN")
  .then(() => console.log("Database Connected !"))
  .catch(console.error);
