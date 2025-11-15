# Happenin - Event Booking Platform

A React-based event booking platform for movies and live events.

## Project Structure

```
Happenin/
├── client/                 # React application
│   ├── public/
│   │   ├── images/        # All images (movies, events, team, etc.)
│   │   └── favicon.png
│   ├── src/
│   │   ├── components/    # Reusable components (Header, Footer, PaymentModal)
│   │   ├── data/          # Static data (movies.js, liveEvents.js)
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services (api.js, omdb.js)
│   │   ├── App.jsx        # Main app with routing
│   │   ├── App.css
│   │   ├── index.css      # Global styles
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── index.html
├── legacy/                 # Old HTML/JS/CSS files (pre-React version)
│   ├── *.html             # Original HTML pages
│   ├── *.js               # Original JavaScript files
│   ├── *.css              # Original CSS files
│   └── articles/          # Article HTML files
├── docs/                   # Documentation and project files
│   ├── xml files/         # XML documentation files
│   ├── LICENSE
│   └── README.md
├── db.json                 # JSON Server database (live events data)
├── README.md               # This file
└── SETUP.md                # Setup instructions
```

## Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### First Time Setup

1. Install dependencies:
```bash
cd client
npm install
```

### Running the Application

You need **two terminal windows** to run both servers:

**Terminal 1 - JSON Server:**
```bash
cd client
npm run server
```
This will start the JSON Server on **http://localhost:3000** (serves live events data from `db.json`)

**Terminal 2 - React Development Server:**
```bash
cd client
npm run dev
```
This will start the React app on **http://localhost:5173**

### Access the Application

Once both servers are running, open **http://localhost:5173** in your browser.

### Stop Servers

Press `Ctrl+C` in each terminal, or run:
```bash
lsof -ti:3000,5173 | xargs kill -9
```

### Troubleshooting

**Port Already in Use:**
```bash
# Kill processes on ports 3000 and 5173
lsof -ti:3000,5173 | xargs kill -9
```

**JSON Server Not Working:**
Make sure `db.json` exists in the root directory

**Dependencies Not Installed:**
Run `npm install` in the `client` directory

## Features

- **Movies**: Browse and book movie tickets with OMDb API integration
- **Live Events**: Discover and book live events (concerts, comedy shows, etc.)
- **Booking Flow**: Complete booking flow with seat selection and checkout
- **Payment**: UPI payment integration with QR code
- **Offers**: Coupon codes and discounts
- **User Authentication**: Login and signup pages

## Technologies

- React 19
- React Router
- Vite
- JSON Server
- OMDb API
- React Hot Toast
- React Player

