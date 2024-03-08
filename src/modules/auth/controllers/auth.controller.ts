import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { SingUpDto } from "../models/singUp.dto";
import { LoginDto } from "../models/login.dto";
import { validate } from "class-validator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("singUp")
  async singUp(@Body() singUpDto: SingUpDto) {
    try {
      await validate(singUpDto);
      return this.authService.register(singUpDto);
    } catch (errors) {
      return new BadRequestException("Errores de registro", errors);
    }
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    try {
      await validate(loginDto);
      return this.authService.login(loginDto);
    } catch (errors) {
      return new BadRequestException("Errores de registro", errors);
    }
  }
}
