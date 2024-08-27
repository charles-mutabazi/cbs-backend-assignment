## Company XYZ Transport Booking System - Backend API

This repository contains the backend API service for the Company XYZ Transport Booking System. The service is built using [NestJS](https://nestjs.com/), a progressive Node.js framework, and is containerized and deployed using Docker Compose.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
    - [Locally without Docker](#1-locally-without-docker)
    - [Using Docker](#2-using-docker)

## Features

- **User Management**: Create and manage user accounts.
- **Booking Management**: Handle transport booking, confirmation, and cancellation.
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

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Docker**: [Download Docker](https://www.docker.com/get-started)
- **Docker Compose**: Included with Docker Desktop

### Installation

1. **Clone the repository:**

```bash
  git clone https://github.com/charles-mutabazi/transport-booking-backend.git
  cd transport-booking-backend
```
## Project setup

```bash
$ npm install
```

## Compile and run the project

### 1. Locally without Docker

Create a .env file in the root directory and populate it with necessary environment variables. An example .env.example is provided

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### 2. Using Docker

```bash
$ docker compose up --build
```
The API will be accessible at http://localhost:3000, and the PostgreSQL database will be running inside a Docker container.
