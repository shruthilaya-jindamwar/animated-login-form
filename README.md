# Animated Login Form

This Next.js app demonstrates a fully functional animated login flow with additional pages:

- **Login** (root `/`) – authenticate using `localStorage`.
- **Register** (`/register`) – create a new user stored in localStorage.
- **Forgot Password** (`/forgot`) – request a reset link; a token is generated and displayed.
- **Reset Password** (`/reset?token=...`) – update password using the token.
- **Dashboard** (`/dashboard`) – simple protected page showing current user and logout.

All authentication state and users are kept in `localStorage` via the helper at `lib/authClient.ts`.

The UI is built around a reusable `AuthLayout` component with animated background and shared styles.

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

Original README content has been replaced with this project-specific overview.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
