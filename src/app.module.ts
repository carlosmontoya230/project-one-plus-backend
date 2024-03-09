import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MoviesModule } from "./modules/movies/movies.module";
import { CategoryModule } from "./modules/category/category.module";
import { AuthModule } from "./modules/auth/auth.module";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { environmentDB } from "./environments/enviromentBD";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: environmentDB.HOST,
      port: environmentDB.PORT,
      username: environmentDB.USER_NAME,
      password: environmentDB.PASSWORD,
      database: environmentDB.DATABASE,
      autoLoadEntities: true,
      synchronize: true
    }),
    MoviesModule,
    CategoryModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
