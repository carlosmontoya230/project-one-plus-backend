import { Controller, Get, HttpStatus, Param, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { MovieService } from "../services/movie.service";

@Controller("movie")
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get("/type/:type/list")
  async getListMovies(
    @Param("type") type: string,
    @Query() queries,
    @Res() resp: Response
  ) {
    try {
      const list = await this.movieService.findAll(type, queries);
      resp.status(HttpStatus.ACCEPTED).json(list);
    } catch (error) {
      resp
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error", status: false, error });
    }
  }

  @Get("/genres/:genres/list")
  async getListMoviesByGenres(
    @Param("genres") genres: string,
    @Res() resp: Response
  ) {
    try {
      const list = await this.movieService.findAllByGenres(genres);
      resp.status(HttpStatus.ACCEPTED).json(list);
    } catch (error) {
      resp
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error", status: false, error });
    }
  }

  @Get("/:id")
  async getMovieDetail(@Param("id") movieId, @Res() resp: Response) {
    try {
      const movieDetails = await this.movieService.findOne(movieId);
      resp.status(HttpStatus.ACCEPTED).json(movieDetails);
    } catch (error) {
      resp
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error", status: false, error });
    }
  }

  @Get("/:id/video")
  async getMovieVideo(@Param("id") movieId, @Res() resp: Response) {
    try {
      const movieDetails = await this.movieService.findOneVideo(movieId);
      resp.status(HttpStatus.ACCEPTED).json(movieDetails);
    } catch (error) {
      resp
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error", status: false, error });
    }
  }
}
