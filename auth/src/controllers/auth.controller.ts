import { Request, Response } from "express";
import { resourceUsage } from "process";
import { UnauthorizedException } from "../errors/unauthorized-error";
import { ValidationException } from "../errors/validation-error";
import { Role } from "../models/Role";
import jwtService from "../services/jwt.service";
import passwordService from "../services/password.service";
import roleService from "../services/role.service";
import userService from "../services/user.service";

export class AuthController {
  public async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException("Wrong Email");
    }

    if (!(await passwordService.compare(user.password, password))) {
      throw new UnauthorizedException("Wrong password");
    }

    req.session = {
      jwt: jwtService.sign({
        id: user.id,
        username: user.username,
        roles: user.roles.map((role) => role.name),
      }),
    };

    res.status(200).json(user);
  }

  public async signup(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = await userService.findByUsername(username);

    if (user) {
      throw new UnauthorizedException();
    }

    const roles = [await roleService.findByName("admin")] as any;

    const createdUser = await userService.create({
      password: await passwordService.hash(password),
      username,
      roles,
    });

    req.session = {
      jwt: jwtService.sign({
        id: createdUser.id,
        username: createdUser.username,
        roles: createdUser.roles.map((role) => role.name),
      }),
    };

    res.status(200).json(createdUser);
  }

  public me(req: Request, res: Response) {
    res.json({
      currentUser: req.currentUser,
    });
  }

  public logout(req: Request, res: Response) {
    req.session = undefined;

    res.status(204).send();
  }
}

export default new AuthController();