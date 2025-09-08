# Receipt Processing Frontend (React)

A responsive React web app for uploading, processing, searching, and managing expense documents (receipts, invoices, PDFs, and images). Integrates with the Flask backend REST API.

## Features

- Upload receipts/invoices with metadata (vendor, date, amount)
- Document list with pagination
- Document detail view with file preview and extracted fields
- Search by vendor, amount, date
- Version history per document
- Admin dashboard for system statistics and job monitoring
- Responsive design and dark/light theme toggle
- Clear error handling for API/network failures

## Getting Started

1. Install dependencies:
   - npm install

2. Set environment variables:
   - Copy .env.example to .env and set REACT_APP_API_BASE_URL
   - Example:
     REACT_APP_API_BASE_URL=http://localhost:5000

3. Start development server:
   - npm start
   - Open http://localhost:3000

If you encounter build errors about missing modules (e.g., react-router-dom), run:
- npm ci
- or npm install

## Environment Variables

- REACT_APP_API_BASE_URL: Base URL of the Flask backend (e.g., http://localhost:5000)

## Project Structure

- src/services/api.js: API client for backend integration
- src/components: Reusable UI components
- src/pages: Application pages and flows
- src/App.js: App shell with routes and navigation

## Notes

- Ensure CORS is enabled on the backend for your frontend origin.
- This app assumes the backend provides endpoints:
  - POST /documents/upload
  - GET /documents (pagination)
  - GET /documents/:id
  - GET /documents/:id/file
  - GET /documents/:id/versions
  - GET /search
  - GET /admin/overview
  - GET /admin/jobs
If your backend uses different paths, update src/services/api.js accordingly.
