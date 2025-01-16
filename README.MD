# Event Analytics Platform

## Table of Contents
1. [Architecture Overview](#architecture-overview)
    - [System Design Explanation](#system-design-explanation)
    - [Deployment Architecture](#deployment-architecture)
2. [Setup Instructions](#setup-instructions)
    - [Local Development Guide](#local-development-guide)
    - [Environment Configuration](#environment-configuration)
    - [Database Setup](#database-setup)
    - [Service Configuration](#service-configuration)
    - [Deployment Procedures](#deployment-procedures)
3. [Technical Decisions](#technical-decisions)
    - [Database Choice Rationale](#database-choice-rationale)
    - [Architecture Decisions](#architecture-decisions)
    - [Technology Stack Justification](#technology-stack-justification)
4. [User Documentation](#user-documentation)
    - [Feature Documentation](#feature-documentation)
    - [Usage Instructions](#usage-instructions)
    - [Configuration Options](#configuration-options)
    - [Troubleshooting Guide](#troubleshooting-guide)
    - [FAQs](#faqs)

## Architecture Overview

### System Design Explanation
The Event Analytics Platform is designed to provide real-time analytics and insights for events. It consists of three main services:
1. **Frontend Service**: A Next.js application that provides the user interface for interacting with the platform.
2. **Event Analytics Backend**: A Python Flask application that handles data processing, sentiment analysis, engagement scoring, and report generation.
3. **Python Service**: A service that connects to the PostgreSQL database for data storage and retrieval.

### Deployment Architecture
The platform is deployed using the following architecture:
- **Frontend**: Deployed on Vercel for seamless integration with Next.js.
- **Backend**: The Event Analytics Backend and Python Service are deployed separately on Render.com for scalability and reliability.
- **Database**: PostgreSQL database hosted on Render.com for data storage.

## Setup Instructions

### Local Development Guide
1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-repo/event-analytics-platform.git
    cd event-analytics-platform
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the `event-analytics-backend` directory and add the necessary environment variables as specified in the `.env.example` file.
    - Create a `.env` file in the `python-service` directory and add the necessary environment variables as specified in the `.env.example` file.

4. **Run the development servers**:
    - For the frontend:
        ```sh
        cd frontend
        npm run dev
        ```
    - For the backend:
        ```sh
        cd event-analytics-backend
        npm start
        ```
    - For the Python service:
        ```sh
        cd python-service
        python app.py
        ```

### Environment Configuration
Ensure that you have the following environment variables set up in your `.env` files:

- **Frontend**:
    - `NEXT_PUBLIC_API_URL`: The URL of the backend API.

- **Backend**:
    - `DATABASE_URL`: The connection string for the PostgreSQL database.
    - `JWT_SECRET`: The secret key for JWT authentication.

- **Python Service**:
    - `DATABASE_URL`: The connection string for the PostgreSQL database.

### Database Setup
1. **Run database migrations**:
    ```sh
    cd event-analytics-backend
    npx prisma migrate dev
    ```

### Service Configuration
Ensure that all services are properly configured to communicate with each other. Update the configuration files as needed.

### Deployment Procedures
Follow the deployment instructions for each service as specified in their respective directories.

## Technical Decisions

### Database Choice Rationale
I chose PostgreSQL for its robustness, scalability, and support for advanced features like JSONB and full-text search.

### Architecture Decisions
The platform is designed with a microservices architecture to ensure scalability and maintainability.

### Technology Stack Justification
- **Frontend**: Next.js for its server-side rendering capabilities and seamless integration with Vercel.
- **Backend**: Flask for its simplicity and flexibility in building APIs.
- **Database**: PostgreSQL for its reliability and advanced features.

### Usage Instructions
Follow the setup instructions to get the platform running locally. Refer to the feature documentation for detailed usage instructions.

### Configuration Options
Refer to the `.env.example` files in each service directory for a list of configurable environment variables.
