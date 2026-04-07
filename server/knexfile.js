export default {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "October12@",
      database: "learn",
    },
    migrations: {
      directory: "./migrations",
    },
  },
};