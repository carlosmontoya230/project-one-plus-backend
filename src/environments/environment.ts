export const environment = {
  production: false,
  TOKEN_KEY: process.env.TOKEN_KEY || "12345678910",
  URL_BASE: process.env.URL_BASE || "https://api.themoviedb.org/3",
  API_KEY: process.env.API_KEY || "96fc4ee7a790789957f07653c93483a6",
  URL_IMG: process.env.URL_IMG || "https://image.tmdb.org/t/p/original",
  AUTHORIZATION:
    process.env.AUTHORIZATION ||
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmZjNGVlN2E3OTA3ODk5NTdmMDc2NTNjOTM0ODNhNiIsInN1YiI6IjY1ZThmYjdlN2M2ZGUzMDE3YzA3OGRmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgdSgttG4ogLdd12WDu0HpA63s0mScmfavyVzfpYa-U"
};
