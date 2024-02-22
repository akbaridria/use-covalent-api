<p align="center">
  <img src="https://github.com/akbaridria/use-covalent-api/assets/26589426/5d999e71-6af6-4d5e-a453-177ac6743cf2" />
</p>

<h1 align="center" tabindex="-1" dir="auto">
  USE-COVALENT-API
</h1>

<p align="center">Simple React Hooks (🪝) For Fetching Covalent API</p>
<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-MIT" />
</p>

<h3 tabindex="-1" dir="auto">
  Introduction ⭐️
</h3>
<p dir="auto">
<strong>Unleash the power of the Covalent API in your React apps with ease!</strong> <br /> use-covalent-api provides a collection of custom React hooks that streamline fetching data from the Covalent API, eliminating the need for manual API calls and error handling. This library simplifies your development process, allowing you to focus on building amazing user experiences.
</p>
<h3 tabindex="-1" dir="auto">
  Key Features 🔑
</h3>
<ul>
  <li>Type Safety: Enjoy the benefits of TypeScript to ensure data consistency and prevent errors.</li>
  <li>Easy Integration: use-covalent-api into your react/next app with a simple provider setup and use the hooks everywhere</li>
  <li>Revalidation: Keep data fresh with built-in revalidation options at every hour.</li>
  <li>Automatic Cancellation: Avoid unnecessary API calls and conserve resources by canceling requests when components unmount.</li>
  <li>Leverages Covalent SDK: Built on top of the proven @covalenthq/client-sdk for reliable and efficient data fetching.</li>
</ul>

<h3 tabindex="-1" dir="auto">
  Available Hooks 🪝
</h3>
<ul>
  <li>Class A Endpoint ✅</li>
  <li>Class B Endpoint ❌ (On Going)</li>
  <li>Class C Endpoint ❌ (On Going)</li>
  <li>Pricing Endpoint ✅</li>
</ul>

<h3 tabindex="-1" dir="auto">
  Getting Started 🏁
</h3>

1. Install the library
```bash
npm i -D @akbaridria/use-covalent-api
// or
yarn add -D @akbaridria/use-covalent-api
```
2. Set your Covalent API Key in `.env` file
```javascript
// react
REACT_APP_COVALENT_KEY="your key"
// next
NEXT_PUBLIC_COVALENT_KEY="your key"
```
3. Setup Provider
```javascript
// react
// in index.tsx / index.jsx

....
root.render(
  <React.StrictMode>
    <CovalentProvider apiKey={process.env.REACT_APP_COVALENT_KEY as string}> // add provider here
        <App />
    </CovalentProvider>
  </React.StrictMode>
);

// next js (app router)
// create provider file ex: provider.tsx and wrapped it in layout

"use client";

import { CovalentProvider } from "@akbaridria/use-covalent-api";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <CovalentProvider
            apiKey={process.env.NEXT_PUBLIC_COVALENT_KEY as string}
        >
            {children}
        </CovalentProvider>
    );
}

```
4. Import and use the hooks in your react component
```javascript
import { useGetTokenBalanceForAddress } from "@akbaridria/use-covalent-api";

export function Component() {
    const { data, errorDetail, loading, isError } = useGetTokenBalanceForAddress({ chainName: "eth-mainnet", walletAddress: "vatalik.eth" });
    ....
}
```

<h3 tabindex="-1" dir="auto">License 🪪</h2>
<p dir="auto">This project is <a href="https://github.com/akbaridria/use-covalent-api/blob/master/LICENSE">MIT</a> licensed.</p>
