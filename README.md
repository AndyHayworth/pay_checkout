# Pay Checkout

A modern, responsive checkout application built with Next.js and TypeScript. This application provides a seamless checkout experience with subscription management capabilities.

## Features

- 📱 Responsive design that works on both desktop and mobile devices
- 🔄 Two-step checkout flow:
  - Order details with subscription selection
  - Payment information collection
- 💳 Secure payment processing integration
- 🎨 Modern UI built with Tailwind CSS and custom components
- 🔒 Type-safe development with TypeScript
- ⚡ Fast page loads and optimal performance with Next.js

## Tech Stack

- [Next.js](https://nextjs.org) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Geist Font](https://vercel.com/font) - Modern, optimized font family

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Project Structure

- `/app` - Next.js application routes and layouts
- `/components` - Reusable React components
  - `/ui` - Base UI components (buttons, inputs, etc.)
  - `CheckoutFlow.tsx` - Main checkout flow logic
  - `OrderDetails.tsx` - Order details and subscription selection
  - `PaymentDetails.tsx` - Payment information collection
- `/lib` - Utility functions and shared logic

## Development

- Edit component files in the `/components` directory
- Modify styles using Tailwind CSS classes
- Add new pages by creating files in the `/app` directory
- Configure project settings in `next.config.mjs`

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
