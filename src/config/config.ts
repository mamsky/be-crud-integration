import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
}

export const config: Config = {
  port: Number(process.env.PORT) || 7890,
  nodeEnv: process.env.NODE_ENV || "development",
};
