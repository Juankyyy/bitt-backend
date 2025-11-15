import { UserService } from "./user.service.js";

export class UserController {
  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.getUserById({ id });

      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
