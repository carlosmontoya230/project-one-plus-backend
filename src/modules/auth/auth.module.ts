import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users/models/users.entity";
import { UsersController } from "./users/controllers/users.controller";
import { UsersService } from "./users/services/users.service";
import { JwtModule } from "@nestjs/jwt";
import { environment } from "src/environments/environment";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    }),
    TypeOrmModule.forFeature([Users]),

    JwtModule.register({
      global: true,
      secret: environment.TOKEN_KEY,
      signOptions: { expiresIn: "1d" }
    })
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService]
})
export class AuthModule {}
