# Sadik Backend

A KeystoneJS backend application with GraphQL API for e-commerce functionality.

## Features

- **User Authentication**: Secure login and registration system
- **Product Management**: Complete product catalog with images
- **Shopping Cart**: Add/remove items from cart
- **Order Processing**: Stripe payment integration with order creation
- **Admin Panel**: KeystoneJS admin interface for content management

## Tech Stack

- **KeystoneJS**: Headless CMS and GraphQL API
- **MongoDB**: Database
- **Stripe**: Payment processing
- **Node.js**: Runtime environment
- **TypeScript**: Type safety

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Access the application:
   - GraphQL API: http://localhost:3000/api/graphql
   - Admin Panel: http://localhost:3000

## API Endpoints

- **GraphQL Playground**: `/api/graphql`
- **Admin UI**: `/`

## Key Mutations

- `checkout`: Process payments and create orders
- `addToCart`: Add products to user's cart
- `authenticateUserWithPassword`: User login

## Development

The application runs on `localhost:3000` by default. The GraphQL schema is automatically generated from the KeystoneJS schemas.
