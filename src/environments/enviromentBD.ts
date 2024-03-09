export const environmentDB = {
  production: false,
  HOST: process.env.DB_HOST || "localhost",
  PORT: parseInt(process.env.DB_PORT, 10) || 3306,
  USER_NAME: process.env.DB_USERNAME || "rootAdmin",
  PASSWORD: process.env.DB_PASSWORD || "123456",
  DATABASE: process.env.DB_DATABASE || "auth_users"
};
