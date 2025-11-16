# 🎬 Happenin - Event Booking Platform

A modern, full-featured React-based event booking platform for movies and live events. Built with React 19, Vite, and featuring dark mode support, seamless booking flows, and integrated payment systems.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.14-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Development](#-development)
- [API Integrations](#-api-integrations)
- [Features in Detail](#-features-in-detail)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Features
- 🎥 **Movie Booking**: Browse movies with OMDb API integration, view details, select showtimes, and book seats
- 🎤 **Live Events**: Discover concerts, comedy shows, and other live events
- 🎫 **Complete Booking Flow**: Date selection → Showtime selection → Seat selection → Checkout
- 💳 **Payment Integration**: UPI payment with QR code support
- 🎟️ **Offers & Coupons**: Discount codes and promotional offers
- 👤 **User Authentication**: Login and signup pages
- 🌙 **Dark Mode**: Full dark mode support with system preference detection and localStorage persistence
- 📧 **Email Notifications**: Ticket confirmation emails via EmailJS
- 📱 **Responsive Design**: Mobile-first, fully responsive UI

### User Experience
- Smooth animations and transitions
- Intuitive navigation
- Real-time seat availability
- Booking summary and confirmation
- Search and filter functionality

## 🛠️ Technologies

### Frontend
- **React 19.1.1** - UI library
- **React Router DOM 7.9.4** - Client-side routing
- **Vite 7.1.14** - Build tool and dev server
- **React Hot Toast 2.6.0** - Toast notifications
- **React Player 3.3.3** - Video player for trailers

### Backend & Data
- **JSON Server 0.17.4** - Mock REST API for live events
- **OMDb API** - Movie data and metadata

### Utilities
- **EmailJS 3.2.0** - Email service integration
- **QRCode 1.5.4** - QR code generation for payments
- **Lucide React 0.545.0** - Icon library

### Development Tools
- **ESLint 9.36.0** - Code linting
- **TypeScript Types** - Type definitions for React

## 📁 Project Structure

```
Happenin/
│
├── client/                          # React application
│   ├── public/                      # Static assets
│   │   ├── images/                  # All images (movies, events, team, etc.)
│   │   │   ├── *.jpg, *.png        # Movie posters, event banners, team photos
│   │   │   └── offers.css          # Offers page styles
│   │   ├── favicon.png              # Site favicon
│   │   └── vite.svg                 # Vite logo
│   │
│   ├── src/                         # Source code
│   │   ├── components/              # Reusable React components
│   │   │   ├── Header.jsx          # Navigation header with dark mode toggle
│   │   │   ├── Footer.jsx          # Site footer
│   │   │   └── PaymentModal.jsx    # Payment confirmation modal
│   │   │
│   │   ├── contexts/               # React Context providers
│   │   │   └── ThemeContext.jsx    # Dark mode theme management
│   │   │
│   │   ├── pages/                   # Page components (routes)
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Movies.jsx          # Movies listing page
│   │   │   ├── MovieDetailPage.jsx # Movie details page
│   │   │   ├── MovieShowtimes.jsx  # Showtime selection
│   │   │   ├── MovieSeats.jsx      # Seat selection
│   │   │   ├── LiveEvents.jsx       # Live events listing
│   │   │   ├── LiveEventDetail.jsx  # Event details
│   │   │   ├── LiveEventBooking.jsx # Event booking
│   │   │   ├── Checkout.jsx        # Checkout page
│   │   │   ├── Offers.jsx          # Offers and coupons
│   │   │   ├── About.jsx           # About page
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Signup.jsx          # Signup page
│   │   │   ├── Booking.jsx         # Booking page (legacy)
│   │   │   └── MovieDetail.jsx      # Movie detail (legacy)
│   │   │
│   │   ├── data/                    # Static data files
│   │   │   ├── movies.js            # Movie data configuration
│   │   │   └── liveEvents.js        # Live events data
│   │   │
│   │   ├── services/                # API services
│   │   │   ├── api.js               # JSON Server API client
│   │   │   └── omdb.js              # OMDb API client
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── sendTicketEmail.js   # EmailJS integration
│   │   │   └── emailTemplatePreview.html # Email template
│   │   │
│   │   ├── assets/                  # Static assets
│   │   │   └── react.svg            # React logo
│   │   │
│   │   ├── App.jsx                  # Main app component with routing
│   │   ├── App.css                  # App-specific styles
│   │   ├── index.css                # Global styles (includes dark mode)
│   │   └── main.jsx                # Application entry point
│   │
│   ├── index.html                   # HTML template
│   ├── package.json                 # Dependencies and scripts
│   ├── vite.config.js               # Vite configuration
│   ├── eslint.config.js             # ESLint configuration
│   ├── README.md                    # Client-specific README
│   └── EMAILJS_SETUP.md             # EmailJS setup instructions
│
├── legacy/                          # Legacy HTML/JS/CSS files (pre-React)
│   ├── *.html                       # Original HTML pages
│   ├── *.js                         # Original JavaScript files
│   ├── *.css                        # Original CSS files
│   └── articles/                    # Article HTML files
│       ├── classical.html
│       ├── coldplay.html
│       ├── comedynights.html
│       ├── goa.html
│       ├── imaginedragons.html
│       └── samay.html
│
├── docs/                            # Documentation
│   ├── xml files/                   # XML documentation files
│   │   ├── admin.xml
│   │   ├── context.xml
│   │   ├── level0.xml
│   │   ├── level1.xml
│   │   ├── level2dfd1.xml
│   │   ├── organsier.xml
│   │   ├── payment.xml
│   │   ├── requirements.xml
│   │   └── usecase.xml
│   ├── LICENSE                      # License file
│   └── README.md                    # Documentation README
│
├── db.json                           # JSON Server database (live events data)
├── README.md                         # This file
└── SETUP.md                          # Setup instructions

```

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** v16 or higher
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/vintech018/Happenin.git
   cd Happenin
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Start the development servers**

   You need **two terminal windows** to run both servers:

   **Terminal 1 - JSON Server (API):**
   ```bash
   cd client
   npm run server
   ```
   This starts the JSON Server on **http://localhost:3000**

   **Terminal 2 - React Development Server:**
   ```bash
   cd client
   npm run dev
   ```
   This starts the React app on **http://localhost:5173**

4. **Access the application**
   - Open **http://localhost:5173** in your browser
   - The JSON Server API is available at **http://localhost:3000**

## 💻 Development

### Available Scripts

```bash
# Development server
npm run dev          # Start Vite dev server

# JSON Server
npm run server       # Start JSON Server on port 3000

# Build
npm run build        # Build for production

# Preview
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

### Development Workflow

1. **Start both servers** (JSON Server and React dev server)
2. **Make changes** to files in `client/src/`
3. **Hot Module Replacement (HMR)** will automatically reload changes
4. **Test features** in the browser at http://localhost:5173

### Code Structure Guidelines

- **Components**: Reusable UI components go in `src/components/`
- **Pages**: Route components go in `src/pages/`
- **Services**: API clients go in `src/services/`
- **Data**: Static data configurations go in `src/data/`
- **Utils**: Helper functions go in `src/utils/`
- **Contexts**: React Context providers go in `src/contexts/`

## 🔌 API Integrations

### OMDb API (Movies)
- **Purpose**: Fetch movie data, ratings, and metadata
- **Configuration**: API key required (see `client/src/services/omdb.js`)
- **Usage**: Used in `Movies.jsx` and `Home.jsx` for displaying movie information

### JSON Server (Live Events)
- **Purpose**: Mock REST API for live events data
- **Data Source**: `db.json` in project root
- **Endpoints**: 
  - `GET /liveEvents` - Fetch all live events
  - `GET /liveEvents/:id` - Fetch specific event

### EmailJS (Email Notifications)
- **Purpose**: Send ticket confirmation emails
- **Configuration**: See `client/EMAILJS_SETUP.md`
- **Usage**: Used in checkout flow to send booking confirmations

## 📱 Features in Detail

### Dark Mode
- **Toggle**: Moon/sun icon in header navigation
- **Persistence**: Preference saved in localStorage
- **System Detection**: Automatically detects system dark mode preference
- **Smooth Transitions**: CSS transitions between themes
- **Comprehensive**: All pages and components support dark mode

### Booking Flow
1. **Browse** movies or live events
2. **Select** date and showtime
3. **Choose** ticket quantities
4. **Pick** seats (for movies)
5. **Checkout** with user details
6. **Payment** via UPI QR code
7. **Confirmation** email sent

### Payment System
- UPI QR code generation
- Payment confirmation modal
- Booking guarantee information
- Transaction status tracking

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill processes on ports 3000 and 5173
lsof -ti:3000,5173 | xargs kill -9
```

### JSON Server Not Working
- Ensure `db.json` exists in the project root
- Check that port 3000 is not in use
- Verify JSON Server is installed: `npm list json-server`

### Dependencies Not Installed
```bash
cd client
npm install
```

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Dark Mode Not Working
- Clear browser cache and localStorage
- Check browser console for errors
- Verify `ThemeContext.jsx` is properly imported in `App.jsx`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow ESLint rules
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent formatting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](docs/LICENSE) file for details.

## 👥 Authors

- **Vaibhav Chawla,Medhansh, Maanit, Shubham ** - Work and development

## 🙏 Acknowledgments

- OMDb API for movie data
- EmailJS for email service
- React team for the amazing framework
- Vite for the fast build tool

## 📞 Support

For support, email support@happenin.com or open an issue in the repository.

---

**Made with ❤️ using React and Vite**
