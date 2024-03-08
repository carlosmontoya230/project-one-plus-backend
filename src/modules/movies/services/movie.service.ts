import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { catchError, firstValueFrom, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class MovieService {
  baseUrl = environment.URL_BASE;
  apiKey = environment.API_KEY;
  urlImg = environment.URL_IMG;

  constructor(private readonly httpService: HttpService) {}

  async findAll(queries): Promise<AxiosResponse<any>> {
    try {
      const listMovies = await firstValueFrom(
        this.httpService
          .get(
            `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=es-ES&page=${queries.page}`
          )
          .pipe(
            map((res: AxiosResponse<any, any>) => {
              const results = res.data.results.map((result) => {
                return {
                  ...result,
                  backdrop_path: `${this.urlImg}${result.backdrop_path}`,
                  poster_path: `${this.urlImg}${result.poster_path}`
                };
              });
              return {
                ...res.data,
                results
              };
            }),
            catchError((err) => {
              throw err.response.data;
            })
          )
      );
      return listMovies;
    } catch (error) {
      throw error;
    }
  }

  async findOne(movieId): Promise<AxiosResponse<any>> {
    try {
      const listMovies = await firstValueFrom(
        this.httpService
          .get(
            `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=es-ES`
          )
          .pipe(
            map((res: AxiosResponse<any, any>) => {
              return {
                ...res.data,
                backdrop_path: `${this.urlImg}${res.data.backdrop_path}`,
                poster_path: `${this.urlImg}${res.data.poster_path}`
              };
            }),
            catchError((err) => {
              throw err.response.data;
            })
          )
      );
      return listMovies;
    } catch (error) {
      throw error;
    }
  }

  async findOneVideo(movieId): Promise<AxiosResponse<any>> {
    try {
      const infoVideo: any = await firstValueFrom(
        this.httpService
          .get(
            `${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}&language=es-ES`
          )
          .pipe(
            map((res: AxiosResponse<any, any>) => {
              const videoInfo = res.data.results.find(
                (result) => result.type.toLowerCase() === "trailer"
              );
              return {
                id: res.data.id,
                videoInfo: videoInfo || res.data.results[0]
              };
            }),
            catchError((err) => {
              throw err.response.data;
            })
          )
      );
      return infoVideo;
    } catch (error) {
      throw error;
    }
  }
}
