import * as dotenv from "dotenv";
import * as path from "path";

const envPath = path.resolve(__dirname, "../env/dev.env");

dotenv.config({ path: envPath });

if (!process.env["BASE_URL"]) {
    console.error("BASE_URL is not defined in the environment variables");
    process.exit(1);
}

//URL
export const baseUrl = process.env["BASE_URL"] as string;