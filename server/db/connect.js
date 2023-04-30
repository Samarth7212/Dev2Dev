const { Client } = require("pg");

const configDev = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  port: process.env.POSTGRES_PORT,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

const configProd = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

if (process.env.NODE_ENV === "production") {
  configDev = configProd;
}

const client = new Client(configDev);

client
  .connect()
  .then(() => console.log("connected"))
  .catch((err) => console.error("connection error", err.stack));

module.exports = client;
