import { Module } from "@nestjs/common";
import { MovieController } from "./controllers/movie.controller";
import { MovieService } from "./services/movie.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    })
  ],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MoviesModule {}
