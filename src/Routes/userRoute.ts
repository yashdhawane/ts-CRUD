import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../Models/user";

const UserRouter = express.Router();

// Register Route
//@ts-ignore
UserRouter.post("/register", async (req: Request, res: Response) : Promise<Response> => {
  try {
    const { username, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

//@ts-ignore
UserRouter.post("/login", async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate JWT token
        // @ts-ignore
        const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ message: "User signed in successfully", token });
    } catch (error) {
        return res.status(500).json({ message: "Error signing in user", error });
    }
});

export default UserRouter;
