import { UserService } from "./user.service.js";

export class UserController {
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.getById({ id });

      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getByUsername(req, res) {
    try {
      const { username } = req.params;

      const user = await UserService.getByUsername(username);

      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
