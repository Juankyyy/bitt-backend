import { UserService } from "./user.service.js";
import { validateCreateUser } from "./user.validation.js";

export class UserController {
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.getById(id);

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

  static async create(req, res) {
    const { name, username, email, password } = req.body;
    const formattedUsername = `@${username}`;

    try {
      const validation = validateCreateUser({
        name,
        username: formattedUsername,
        email,
        password,
      });

      if (!validation.success) {
        return res
          .status(400)
          .json({ message: JSON.parse(validation.error.message) });
      }

      const user = await UserService.create({
        name,
        username: formattedUsername,
        email,
        password,
      });

      res.status(201).json({ message: "Usuario creado", user: user });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
}
