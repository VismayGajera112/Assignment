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