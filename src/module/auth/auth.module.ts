import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { Module } from "@nestjs/common";
import { AuthService } from "../../service/auth/auth.service";
import { AuthController } from "../../controllers/auth/auth.controller";

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY || 'KEY', signOptions: {
        expiresIn: process.env.EXPIRESIN || 60,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
    PassportModule,
    JwtModule
  ],
})
export class AuthModule {}
