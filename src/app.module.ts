import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./module/users/users.module";
import { AuthModule } from "./module/auth/auth.module";
import { PassportModule } from "@nestjs/passport";

const username = process.env.POSTGRES_USER || "postgres";
const password = process.env.POSTGRES_PASSWORD || "example";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PassportModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username,
      password,
      database: "postgres",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
