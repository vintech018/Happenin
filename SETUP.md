# How to Run Happenin

## Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

## Setup Instructions

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Start the JSON Server (Terminal 1)
The JSON Server provides the live events data API. Run this in a separate terminal:
```bash
cd client
npm run server
```
This will start the JSON Server on **http://localhost:3000**

### 3. Start the React Development Server (Terminal 2)
In a new terminal window, run:
```bash
cd client
npm run dev
```
This will start the React app on **http://localhost:5173**

## Access the Application

Once both servers are running:
- **React App**: Open http://localhost:5173 in your browser
- **JSON Server API**: http://localhost:3000 (for API endpoints)

## Quick Start (One Command)
If you want to run both servers, you'll need two terminal windows:

**Terminal 1:**
```bash
cd client && npm run server
```

**Terminal 2:**
```bash
cd client && npm run dev
```

## Troubleshooting

### Port Already in Use
If you get a "port already in use" error:
```bash
# Kill processes on ports 3000 and 5173
lsof -ti:3000,5173 | xargs kill -9
```

### JSON Server Not Working
Make sure `db.json` exists in the root directory (`/Users/vaibhav/Desktop/Happenin/db.json`)

### Dependencies Not Installed
Run `npm install` in the `client` directory

## Project Structure
- `client/` - React application
- `db.json` - JSON Server database (live events data)
- `legacy/` - Old HTML/JS/CSS files (archived)
- `docs/` - Documentation files

## Features
- Browse movies (OMDb API integration)
- Browse live events (JSON Server)
- Book tickets with seat selection
- Checkout with UPI payment
- Coupon codes and offers
- User authentication (Login/Signup)
