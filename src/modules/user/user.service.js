import { User } from "./User.model.js";

export class UserService {
  static async getById({ id }) {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  static async getByUsername(input) {
    const user = await User.findOne({ username: input });

    if (!user) {
      throw new Error("Username not found");
    }

    return user;
  }
}
