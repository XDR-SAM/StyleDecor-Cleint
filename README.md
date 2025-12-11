# StyleDecor - Smart Home & Ceremony Decoration Booking System

A modern appointment management system for decoration services with role-based dashboards, payment integration, and real-time booking management.

## Features

- 🎨 **Service Management**: Browse and book decoration services
- 👥 **Role-Based Access**: Separate dashboards for Users, Admins, and Decorators
- 💳 **Stripe Payment Integration**: Secure payment processing
- 📍 **Service Coverage Map**: Interactive map showing service areas
- 🔍 **Search & Filters**: Advanced filtering for services
- 📊 **Analytics Dashboard**: Business insights and statistics
- 🎭 **Animated UI**: Beautiful animations with Framer Motion
- 🎨 **Modern Design**: Tailwind CSS + DaisyUI components

## Tech Stack

- **Frontend**: React 19, Vite
- **State Management**: TanStack Query, Zustand
- **Routing**: React Router v7
- **Styling**: Tailwind CSS, DaisyUI
- **Animations**: Framer Motion
- **Maps**: React Leaflet
- **Payments**: Stripe
- **Authentication**: Firebase + JWT
- **HTTP Client**: Axios

## Prerequisites

- Node.js 18+ and npm
- MongoDB database
- Firebase project
- Stripe account

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
.
├── .env
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── index.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── dist/
│   ├── assets/
│   │   ├── StyleDecorFooterlogo-DHmi518J.png
│   │   ├── herosticker-BvMMB2uy.png
│   │   ├── herosticker1-DTpnHzvN.png
│   │   ├── herosticker2-DkbNrGs3.png
│   │   ├── herosticker3-BzTXekX3.png
│   │   ├── herosticker4-BfcKBDfr.png
│   │   ├── index-BJ8BO89F.js
│   │   ├── index-BzoA9CVa.css
│   │   ├── index-jgbzAm8p.js
│   │   └── logo-CYO78bq7.png
│   ├── _redirects
│   ├── index.html
│   └── vite.svg
├── public/
│   ├── _redirects
│   └── vite.svg
└── src/
    ├── assets/
    │   ├── 6717376.png
    │   ├── 9155639.png
    │   ├── 9496775.png
    │   ├── StyleDecorFooterlogo.png
    │   ├── herosticker.png
    │   ├── herosticker1.png
    │   ├── herosticker2.png
    │   ├── herosticker3.png
    │   ├── herosticker4.png
    │   ├── logo.png
    │   └── react.svg
    ├── authcontext/
    │   └── authcontext.jsx
    ├── components/
    │   ├── dashboard/
    │   │   ├── AdminDashboard.jsx
    │   │   ├── Analytics.jsx
    │   │   ├── DecoratorDashboard.jsx
    │   │   ├── ManageBookings.jsx
    │   │   ├── ManageDecorators.jsx
    │   │   ├── ManageServices.jsx
    │   │   └── UserDashboard.jsx
    │   ├── Footer.jsx
    │   ├── Layout.jsx
    │   ├── Loading.jsx
    │   ├── Modal.jsx
    │   ├── Navbar.jsx
    │   └── ServiceCoverageMap.jsx
    ├── contexts/
    │   └── ThemeContext.jsx
    ├── pages/
    │   ├── Booking.jsx
    │   ├── Dashboard.jsx
    │   ├── ErrorPage.jsx
    │   ├── Home.jsx
    │   ├── Login.jsx
    │   ├── Payment.jsx
    │   ├── PaymentCancelled.jsx
    │   ├── PaymentSuccess.jsx
    │   ├── Register.jsx
    │   ├── ServiceDetails.jsx
    │   └── Services.jsx
    ├── router/
    │   ├── protectedrout.jsx
    │   └── routes.jsx
    ├── util/
    │   └── api.js
    ├── App.css
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

## Key Features

### User Dashboard
- View and manage bookings
- Payment history
- Cancel bookings
- Make payments

### Admin Dashboard
- Manage services (CRUD)
- Manage bookings
- Assign decorators
- Manage decorator accounts
- View analytics and revenue

### Decorator Dashboard
- View assigned projects
- Update project status
- Track earnings

## API Endpoints

The frontend communicates with the backend API. Ensure your backend server is running on the port specified in `VITE_API_URL`.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

This project is part of my Assignment 11 from PH.
