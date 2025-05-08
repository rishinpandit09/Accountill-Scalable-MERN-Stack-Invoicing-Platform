# Accountill – Scalable MERN Stack Invoicing Platform

**Overview**

Accountill is a cloud-native, highly available invoicing platform built on the MERN stack. It provides users with RESTful and GraphQL APIs for creating, managing, and paying invoices, powered by an event-driven architecture that tracks status changes in real time. Containerized microservices, message queues, in-memory caching, and orchestration ensure resilience, scalability, and performance.

## Core Features

### 1. User Management
- Signup/login with JWT authentication  
- Role-based access control (Admin, Accountant, Client)

### 2. Invoice Service
- Create, read, update, delete invoices  
- Line-item management  
- PDF generation and download

### 3. Payment Service
- Integrate with Stripe/PayPal for payment processing  
- Webhooks to confirm payments  
- Automatic status updates (paid, overdue)

### 4. Event Bus
- Publish invoice and payment events via RabbitMQ  
- Multiple subscribers (email notifications, analytics)

### 5. Analytics Dashboard
- Real-time charts (revenue, outstanding invoices)  
- Caching with Redis to accelerate queries

### 6. GraphQL API
- Aggregated views and complex queries  
- Single endpoint for client apps

### 7. Admin Portal
- User management UI  
- Service health and logs

## High-Level Architecture


## Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, Apollo Client  
- **API Layer:** Node.js, Express.js, Apollo Server  
- **Database:** MongoDB Atlas  
- **Cache:** Redis (AWS ElastiCache)  
- **Message Bus:** RabbitMQ (AWS MQ)  
- **Containerization:** Docker  
- **Orchestration:** Kubernetes (EKS/GKE)  
- **CI/CD:** GitHub Actions, Docker Hub, Helm Charts  
- **Monitoring:** Prometheus & Grafana

## Database Schema (MongoDB)

- **Users:** `_id`, `name`, `email`, `passwordHash`, `roles[]`  
- **Invoices:** `_id`, `userId`, `clientInfo`, `items[]`, `total`, `status`, `dueDate`, `createdAt`  
- **Payments:** `_id`, `invoiceId`, `amount`, `method`, `status`, `transactionId`, `createdAt`  

## Folder Structure

