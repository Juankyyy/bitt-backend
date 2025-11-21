import bcrypt from "bcrypt";
import { User } from "./User.model.js";

export class UserService {
  static async getById(id) {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  static async getByUsername(username) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("Username not found");
    }

    return user;
  }

  static async create({ name, username, email, password }) {
    const emailAlreadyExists = await User.findOne({ email });
    const usernameAlreadyExists = await User.findOne({ username });

    if (emailAlreadyExists) {
      throw new Error("Email already exists");
    }

    if (usernameAlreadyExists) {
      throw new Error("Username already exists");
    }

    const bcryptPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      username,
      email,
      password: bcryptPassword,
    });

    await newUser.save();
    return newUser;
  }

  static async login({ input, password }) {
    const user = await User.findOne({
      $or: [{ username: `@${input}` }, { email: input }],
    });

    if (!user) throw new Error("User not found");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Password incorrect");

    return user;
  }

  static async update(id, input) {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  }
}
