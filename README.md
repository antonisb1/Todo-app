# 🗂️ Taskboard Frontend

This is the frontend for a personal taskboard application, built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Ant Design**.  
It supports a drag-and-drop Kanban board, simple login, and clean routing structure using React Router v6.

---

## 🚀 Tech Stack

- ⚛️ React (with Vite + TypeScript)
- 🎨 Tailwind CSS
- 🧩 Ant Design (v5)
- 🔃 React Router v6
- 🔔 Global notification handler (custom `MessageProvider` using AntD message API)
- 📁 Clean file structure with providers, pages, router, and components

---

## 📂 Project Structure

├── components/ # Reusable UI components (e.g., TaskBoard)
├── pages/ # Page-level components (e.g., Login, TaskboardPage)
├── providers/ # Global context providers (e.g., MessageProvider)
├── router/ # Route definitions and navigation logic
├── utils/ # Utility functions (e.g., notify wrapper)
├── App.tsx # Main app with provider + router
└── main.tsx # Vite entry point



ToDo App – Azure Deployment Documentation

Overview
This document describes the complete deployment of a full-stack ToDo application to Microsoft Azure.
The application consists of a React (Vite) frontend with Typescript, a Node.js backend, and a MongoDB-compatible database hosted on Azure Document DB.
The deployment includes CI/CD automation and secret management

Architecture
- Frontend: Azure Static Web Apps
- Backend: Azure App Service (Node.js, Linux)
- Database: Azure Cosmos DB (MongoDB API)
- Secrets: Azure Key Vault with Managed Identity
- CI/CD: GitHub Actions

Backend Deployment
1. Created an Azure App Service (Linux, Node.js).
2. Configured application settings (MONGODB_URI, JWT_SECRET).
3. Enabled System Assigned Managed Identity.
4. Granted Key Vault Secrets User role to the App Service.
5. Connected backend to Cosmos DB using Document DB.
6. Verified backend via health endpoint.

Database Setup
- Created Cosmos DB account using Document.
- Migrated local MongoDB data using MongoDB Compass.
- Used “Self (always this cluster)” connection string.

Secrets Management
- Stored MongoDbUri and JwtSecret in Azure Key Vault.
- Referenced secrets using @Microsoft.KeyVault syntax.
- Resolved RBAC and networking access issues.

Frontend Deployment
1. Built React frontend using Vite (output: dist).
2. Created Azure Static Web App linked to GitHub repository.
3. Configured GitHub Actions CI/CD workflow.
4. Injected VITE_API_BASE_URL at build time.
5. Configured SPA routing with staticwebapp.config.json.

CI/CD
- Automated builds and deployments via GitHub Actions.
- Separate build and deploy steps for frontend.
- Environment variables injected at build time.

API Integration
- Ensured frontend calls backend using absolute API URL.

Troubleshooting
- Fixed undefined environment variables in Azure static web apps using Github Actions and Github environmental variables.
- Resolved Method Not Allowed errors by correcting API URLs.
- Addressed quota and RBAC issues.
- Fixed SPA refresh 404 using navigation fallback.

Conclusion
The application is fully deployed to Azure using best practices.
The setup demonstrates cloud-native architecture, security, automation, and scalability.

The frontend deployed in azure looks like this: 

<img width="1887" height="854" alt="image" src="https://github.com/user-attachments/assets/8e170f20-5f99-4f24-8327-f2d15a95ca28" />

<img width="873" height="592" alt="image" src="https://github.com/user-attachments/assets/55c030b5-249e-44ec-9cc1-644cb8ded6b8" />

<img width="1911" height="855" alt="image" src="https://github.com/user-attachments/assets/dfd92f84-fe2c-4197-9206-a59b668803a6" />


