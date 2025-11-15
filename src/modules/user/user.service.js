import { User } from "./User.model.js";

export class UserService {
  static async getUserById({ id }) {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
