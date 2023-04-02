require('dotenv').config({ path: __dirname+'/.env' })
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ignoreBuildErrors: true,
  env: {
    NFT_ADDRESS: process.env.NFT_ADDRESS,
    TOKEN_ADDRESS: process.env.TOKEN_ADDRESS,
    MARKETPLACE_ADDRESS: process.env.MARKETPLACE_ADDRESS,
    NEXT_PUBLIC_CHAIN_ID: "1313161555",
    WEB3_HOST_PROVIDER: "https://testnet.aurora.dev"
  }
}

module.exports = nextConfig
