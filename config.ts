import { config } from "dotenv";
config();

export const SINRIC_DEVICE_ID = process.env.SINRIC_DEVICE_ID ?? "";
export const SINRIC_APP_KEY = process.env.SINRIC_APP_KEY ?? "";
export const SINRIC_APP_SECRET = process.env.SINRIC_APP_SECRET ?? "";
export const CHROMECAST_IP = process.env.CHROMECAST_IP ?? "";
