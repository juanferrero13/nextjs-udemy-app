// const config = require("./config.js")
import config, { API, NEXTAUTH_SECRET } from "./config.js"

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_URI: config.DB_URI,
        API: config.API,
        NEXTAUTH_SECRET: config.NEXTAUTH_SECRET,
    }
}

export default nextConfig
