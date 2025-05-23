# Transaction Management System

A robust financial transaction management system built with NestJS, implementing a modular architecture for handling user and wallet operations. The system leverages TypeORM with PostgreSQL for data persistence, following domain-driven design principles with clear separation of concerns. The application is structured around core modules (User and Wallet) with a shared common module for reusable components, demonstrating a microservices-ready architecture.

The project employs modern TypeScript features and NestJS decorators for dependency injection and metadata reflection, while maintaining strict type safety throughout the codebase. Configuration is externalized through environment variables, and the application follows RESTful API design principles. The codebase is set up with comprehensive testing infrastructure using Jest, and includes code quality tools for maintaining consistent code style.

## Core Technologies

- NestJS 11.x
- TypeORM with PostgreSQL
- TypeScript 5.x
- ESLint & Prettier for code quality
- RxJS for reactive programming

## Development

### Prerequisites

- Node.js (LTS version)
- PostgreSQL
- npm or yarn

### Installation

```bash
npm install
```

### Available Scripts

- `npm run build` - Build the application
- `npm run format` - Format code using Prettier
- `npm run start` - Start the application
- `npm run start:dev` - Start the application in development mode with hot-reload
- `npm run start:debug` - Start the application in debug mode
- `npm run start:prod` - Start the application in production mode

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database
```

### Testing

```bash
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests
npm run test:cov    # Run test coverage
```
