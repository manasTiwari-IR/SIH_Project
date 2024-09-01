# SIH Project: An Interactive Job and Internship Platform for the Technical Education Department

This project is aimed at creating a comprehensive platform for students and graduates to access job and internship opportunities, connecting them with industries and organizations. The platform facilitates efficient communication between job seekers and employers, with a focus on the technical education sector.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Installation](#installation)

## Project Overview
The platform is designed to assist students and graduates in finding job and internship opportunities by connecting them with potential employers. It enhances the transition from education to employment by offering personalized job matching, internship resources, and mentorship programs.

## Features
- Job and internship listings for students and graduates
- AI-driven job matching and recommendations
- User authentication and role-based access control
- Mentorship and career counseling services
- Internship opportunities for skill development
- Responsive design for seamless usage across devices

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **React Router DOM**: Routing library for React
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **concurrently**: package to run more than one server together 

### Backend
- **Express**: Web framework for Node.js
- **Mongoose**: MongoDB object modeling tool
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing
- **bcrypt**: Library for hashing and verifying passwords
- **express-validator**: Middleware for validating and sanitizing input
- **jsonwebtoken (JWT)**: Library for secure user authentication
- **nodemon**: Tool for automatically restarting the server during development

## Installation

### Prerequisites
- Node.js and npm installed on your machine
- MongoDB set up and running

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/sih-project.git
   cd sih-project
2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
3. **Install backend dependencies:**
   ```bash
   cd ../backend
   npm install
4. **Start the servers:**
   ```bash
   cd frontend
   npm run both
