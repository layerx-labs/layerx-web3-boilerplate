# LayerX React.js Boilerplate Project

## Stack 

* Next.js
* LayerX RocketKit - UI kit 
* LayerX Dappkit - Web3 Framework

## Features 

- Styled Components Setup to style components and customize Rocket Kit
- UI Framework 
- Automatic EVM Switch 
- Metamask Onboarding 
- Basic Ethersum React Hooks (useBalance, useAddress, useETHBalance, ...)
- useWeb3 Hook to easily connect and disconnect from wallets
- Hooks-first approach to fetching and caching data from Contracts and memoization for performance with SWR


## Previous Art 

* [mirshko/next-web3-boilerplate](https://github.com/mirshko/next-web3-boilerplate)

## Getting Started


Create an environment file that specifies the chain Id that you would like to connect to 

```
echo "NEXT_PUBLIC_CHAIN_ID=5" >> .env
``` 

Check the supported [Networks](./constants/networks.ts) or add other networks

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.
You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

## Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.