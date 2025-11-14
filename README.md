# Admin Personalized Dashboard

A modern, professional admin dashboard built with React and TypeScript for managing users and monitoring platform activities.

## Features

- **User Management**: View, search, and manage all registered users with complete account details
- **Dashboard Overview**: Real-time statistics and metrics display
- **Recent Activity**: Track and monitor recent platform activities
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean, professional interface with smooth animations
- **API Integration**: Seamless integration with backend API services

##  Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** (for version control)

##  Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admin-personalized
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=https://personalised-ai-backend-production.up.railway.app
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5174` (or the port shown in your terminal).

##  Project Structure

```
admin-personalized/
├── public/
│   └── images/          # Static images and assets
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Banner.tsx
│   │   ├── ErrorDisplay.tsx
│   │   ├── RecentActivity.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SideModal.tsx
│   │   ├── StatsCard.tsx
│   │   ├── TopBar.tsx
│   │   ├── UserTable.tsx
│   │   └── UserTableSkeleton.tsx
│   ├── pages/           # Page components
│   │   ├── HomePage.tsx
│   │   └── UsersPage.tsx
│   ├── services/        # API service layer
│   │   ├── api.ts
│   │   ├── endpoints.ts
│   │   └── userService.ts
│   ├── types/           # TypeScript type definitions
│   │   └── user.ts
│   ├── data/            # Static data files (JSON)
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── .env                 # Environment variables (not committed)
├── .gitignore
├── package.json
├── vite.config.ts
└── README.md
```

## API Integration

The project integrates with the Natural Language Banking API. The base URL is configured via environment variables.

### Available Endpoints

- **GET `/api/users`** - Fetch all users with complete details
- **GET `/api/users/{id}`** - Get specific user details by ID

### API Configuration

The API base URL is set in the `.env` file:
```env
VITE_API_BASE_URL=https://personalised-ai-backend-production.up.railway.app
```

In development, the Vite proxy automatically forwards `/api` requests to the configured base URL, avoiding CORS issues.

##  Key Components

### Dashboard (HomePage)
- **Banner**: Personalized greeting with admin name, date, and staff ID
- **Stats Cards**: Display key metrics (Users, Transactions, Balance, Tickets)
- **Recent Activity**: List of recent platform activities

### Users Page
- **User Table**: Paginated table displaying all users
- **User Details Modal**: Side modal showing complete user information including:
  - Profile details
  - Account balances
  - All associated accounts
  - Account information

### Navigation
- **Sidebar**: Collapsible sidebar with navigation links
- **TopBar**: Context-aware top bar with page titles

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **Hugeicons** - Icon library
- **Fetch API** - HTTP requests

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

##  Environment Variables

Create a `.env` file in the root directory with:

```env
VITE_API_BASE_URL=your_api_base_url_here
```

**Important**: Never commit the `.env` file to version control. It's already included in `.gitignore`.

## Features in Detail

### User Management
- View all registered users in a paginated table
- Search and filter capabilities
- View detailed user information in a side modal
- See account balances and transaction history

### Error Handling
- Comprehensive error display with visual indicators
- Retry functionality for failed requests
- User-friendly error messages
- Network error detection

### Loading States
- Skeleton loaders for better UX
- Smooth animations and transitions
- Loading indicators for async operations

## Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

3. **Set environment variables** on your hosting platform:
   - `VITE_API_BASE_URL` - Your production API URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

##  Support

For support, please contact the development team (08101854615).

---

Made with ❤️ by **HEAT Labs**
+2348060585934