import UserSchema from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Sign up function
export const signup = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    const newUser = new UserSchema({
      name,
      email,
      password: hash,
      phone,
      role,
    });

    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(401).send("Something went wrong !");
  }
};

// Log in function
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(401).send("User not found !");
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );

      res.status(200).json({ message: "User logged in successfully", token });
    } else {
      res.status(401).send("Invalid password !");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong !");
  }
};

// Log out function
export const logout = (req, res) => {
  res.clearCookie("userToken");
  res.status(200).send("Successfully logged out");
};

// Get user information function
export const getUser = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.user.id);

    if (!user) {
      return res.status(401).send("User not found !");
    }

    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong !");
  }
};

// Update user information function
export const updateUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    const updatedUser = await UserSchema.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        password: hash,
        phone,
        role,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(401).send("User not found !");
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong !");
  }
};

// Delete user function
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserSchema.findByIdAndDelete(req.user.id);

    if (!deletedUser) {
      return res.status(401).send("User not found !");
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong !");
  }}