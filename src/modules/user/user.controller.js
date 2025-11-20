import { UserService } from "./user.service.js";
import { validateCreateUser } from "./user.validation.js";
import jwt from "jsonwebtoken";

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

      const formattedUsername = username.startsWith("@")
        ? username
        : `@${username}`;

      const user = await UserService.getByUsername(formattedUsername);

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

      res.status(201).json({ message: "Usuario registrado", user: user });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { input, password } = req.body;

      const user = await UserService.login({ input, password });

      const token = jwt.sign(
        { id: user._id, username: `@${user.username}`, email: user.email },
        process.env.JWT_SECRET
      );

      res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "prod",
          sameSite: process.env.NODE_ENV === "prod" ? "None" : "Lax",
        })
        .json({ message: "Login correcto", user: user });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  static async logout(req, res) {
    res
      .status(200)
      .clearCookie("jwt")
      .json({ message: "Se cerró la sesión" });
  }
}
