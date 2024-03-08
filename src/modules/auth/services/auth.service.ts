import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";

import * as bcryptjs from "bcryptjs";
import { LoginDto } from "../models/login.dto";
import { UsersService } from "../users/services/users.service";
import { SingUpDto } from "../models/singUp.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register({ password, email, name, document_number }: SingUpDto) {
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (user) {
        throw new BadRequestException("Email está en uso, prueba con otro");
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      await this.usersService.create({
        name,
        document_number,
        email,
        password: hashedPassword
      });

      return {
        message: "Usuario Creado exitosamente, bienvenido"
      };
    } catch (error) {
      console.error("Error durante el registro:", error);
      throw new BadRequestException("Error al crear el usuario");
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (!user) {
        throw new UnauthorizedException("Datos incorrectos");
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException("Datos incorrectos");
      }

      const payload = { email: user.email };

      const token = await this.jwtService.signAsync(payload);
      console.log(token);

      return {
        email: user.email,
        name: user.name,
        document: user?.document_number,
        token: token
      };
    } catch (error) {
      console.error("Error durante el login:", error);
      throw new UnauthorizedException("Error al iniciar sesión");
    }
  }
}
