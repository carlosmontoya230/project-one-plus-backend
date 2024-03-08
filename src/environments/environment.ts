export const environment = {
  production: false,
  TOKEN_KEY: process.env.TOKEN_KEY || "12345678910",
  URL_BASE: process.env.URL_BASE || "https://api.themoviedb.org/3",
  API_KEY: process.env.API_KEY || "96fc4ee7a790789957f07653c93483a6",
  URL_IMG: process.env.URL_IMG || "https://image.tmdb.org/t/p/original"
};
