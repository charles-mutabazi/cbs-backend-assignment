## Company XYZ Car Booking System - Backend API

This repository contains the backend API service for the Company XYZ Car Booking System. The service is built using [NestJS](https://nestjs.com/), a progressive Node.js framework, and is containerized and deployed using Docker Compose.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the frontend](#running-the-frontend)

## Features

- **User Management**: Create and manage user accounts.
- **Booking Management**: Handle car booking, confirmation, and cancellation.
- **Driver Management**: Create and manage driver accounts.
- **Analytics**: Collect and provide booking-related metrics.
- **RESTful APIs**: Expose services through RESTful endpoints.

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: PostgreSQL (with Prisma ORM)
- **Authentication**: JWT (JSON Web Tokens and Passport.js)
- **Containerization**: Docker & Docker Compose
- **Testing**: Jest & Supertest

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Docker**: [Download Docker](https://www.docker.com/get-started)

## Installation

1. **Clone the repository:**

```bash
  git clone https://github.com/charles-mutabazi/car-booking-backend.git
  cd car-booking-backend
```

2. **Compile and run the project**

Create a .env file in the root directory and populate it with necessary environment variables. An example .env.example is provided

.env file example (used also in docker-compose.yml):
```bash
POSTGRES_PASSWORD="admin_password"
DATABASE_URL="postgres://root:${POSTGRES_PASSWORD}@postgres:5432/car_booking_db"
JWT_SECRET_KEY="secret_key"
```
Then...

```bash
$ docker compose up --build
```
The API will be accessible at http://localhost:3000, and the PostgreSQL database will be running inside a Docker container.

### Testing the API
Use Postman or any other API testing tool to test the API endpoints using http://localhost:3000/api as the base URL.
Note: The API requires authentication for most endpoints. You can obtain an access token by 

1. Create a user account by sending a POST request to http://localhost:3000/users with the following payload:
```javascript
{
  "names": string,
  "email": string,
  "password": string
}
```

2. Log in to obtain an access token by sending a POST request to http://localhost:3000/auth/login with the following payload:
```javascript
{
  "email": string,
  "password": string
}
```

3. Use the access token in the Authorization header of subsequent requests as a Bearer token.

## Running the frontend
To run the frontend, clone the [frontend repo](https://github.com/charles-mutabazi/cbs-backend-assignment) and follow the instructions in the README.md file

