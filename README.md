# MrByte66

Personal digital platform focused on software engineering, artificial intelligence, technology, and personal knowledge sharing.

## Overview

MrByte66 is a long-term personal platform designed to showcase technical projects, articles, AI experiments, and cultural content.

The platform is planned to evolve from a personal digital identity into a more flexible content platform.

## Current Status

Backend and frontend skeletons are running.

- Backend: Spring Boot API with `/api/health` endpoint (`backend/`)
- Frontend: Next.js App Router skeleton showing backend status (`frontend/`)
- Local orchestration: `docker-compose.yml` (PostgreSQL + backend + frontend)

## Quick Start

With Docker (requires Docker Desktop):

```powershell
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8080/api/health
- PostgreSQL: localhost:5432 (db `mrbyte66`, dev credentials in `docker-compose.yml`)

Local development without Docker:

```powershell
cd backend
mvn spring-boot:run
```

```powershell
cd frontend
npm install
npm run dev
```

## Planned Technologies

Backend:
- Java 25
- Spring Boot
- PostgreSQL

Frontend:
- Next.js
- React
- TypeScript

Architecture:
- Modular Monolith

## Documentation

Project documentation is maintained in:

`MrByte66-Knowledge`

This folder contains:
- Product vision
- Requirements
- Architecture decisions
- Development guidelines