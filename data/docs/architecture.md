# Architecture Document

## Backend Architecture
Express.js REST API with MVC pattern. In-memory JSON data processing.

## Frontend Architecture
React + Vite. Component-based with service layer for API calls.

## Data Flow
CSV → JSON converter → backend/data/sales.json → API → React components

## Folder Structure
As per assignment specification.

## Module Responsibilities
- `sales.service.js`: All business logic
- `salesApi.js`: API abstraction
- `App.jsx`: Orchestration
