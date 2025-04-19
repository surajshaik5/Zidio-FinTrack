# FinTrak - Expense Management System

FinTrak is a comprehensive expense management system designed to streamline financial tracking for businesses of all sizes. With role-based access controls, it enables employees to submit expenses, managers to review and approve them, and administrators to gain insights through advanced analytics.

## 📋 Project Overview

FinTrak provides a modern, responsive user interface with the following key features:

- **User Authentication**: Secure login/signup with role-based access control (Employee, Manager, Admin)
- **Dashboard Analytics**: Visual representation of expense data through charts and graphs
- **Expense Management**: Submit, track, approve, and manage expense requests
- **Reporting Tools**: Generate and export detailed expense reports
- **Responsive Design**: Optimized for all device sizes from mobile to desktop

## 🔧 Tech Stack

- **Frontend**: React.js, Material-UI, Recharts
- **State Management**: React Hooks and Context API
- **Routing**: React Router
- **Build Tool**: Vite

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation Steps

1. Clone the repository
   ```bash
   git clone https://github.com/raihanahmadkhan/FinTrak.git
   cd FinTrak
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Build for production
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
fintrak/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── DashboardCard.jsx
│   │   ├── DashboardLayout.jsx
│   │   ├── Navbar.jsx
│   │   └── NotificationCenter.jsx
│   ├── pages/
│   │   ├── dashboard/       # Dashboard-related pages
│   │   │   ├── admin/       # Admin-specific pages
│   │   │   ├── manager/     # Manager-specific pages
│   │   │   └── employee/    # Employee-specific pages
│   │   ├── Home.jsx         # Landing page
│   │   ├── Login.jsx        # Authentication pages
│   │   ├── Signup.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── hooks/               # Custom hooks for authentication, etc.
│   ├── ThemeContext.jsx     # Theme context for dark/light mode
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Entry point
└── package.json
```

## 🔌 API Integration Points

For the backend team developing with SpringBoot, here are the key integration points:

### Authentication Endpoints

- `POST /api/auth/login`: User login with credentials and role
- `POST /api/auth/signup`: User registration
- `GET /api/auth/profile`: Get current user profile

### Expense Management

- `GET /api/expenses`: List expenses (with filters for status, date range)
- `POST /api/expenses`: Create new expense
- `PUT /api/expenses/{id}`: Update expense
- `DELETE /api/expenses/{id}`: Delete expense
- `PUT /api/expenses/{id}/approve`: Approve expense
- `PUT /api/expenses/{id}/reject`: Reject expense

### Analytics

- `GET /api/analytics/summary`: Get expense summary (total, pending, approved)
- `GET /api/analytics/by-category`: Get expenses grouped by category
- `GET /api/analytics/by-department`: Get expenses grouped by department
- `GET /api/analytics/monthly`: Get monthly expense trends

### Data Models

**User Model**
```json
{
  "id": "string",
  "name": "string",
  "workId": "string",
  "email": "string",
  "role": "EMPLOYEE | MANAGER | ADMIN"
}
```

**Expense Model**
```json
{
  "id": "string",
  "employeeId": "string",
  "category": "string",
  "amount": "number",
  "date": "date",
  "description": "string",
  "status": "PENDING | APPROVED | REJECTED",
  "receiptUrl": "string",
  "submittedDate": "date",
  "approvedBy": "string",
  "approvedDate": "date"
}
```

## 🎨 UI Components

The UI is built with Material-UI with a custom theme that supports both light and dark modes. Key features include:

- Glass-morphism design for cards and forms
- Responsive layout that adapts to screen size
- Interactive data visualization with Recharts
- Consistent teal blue color scheme (#26A6B5) with hover states

## 🔄 State Management

The application uses React's Context API for global state management:
- `ThemeContext`: Controls light/dark mode
- Authentication state is managed through custom hooks

## 🧪 Development Notes

Currently, the application uses mock data for demonstration purposes. The backend team should replace these with actual API endpoints following the structure outlined above.

## 📝 License

[MIT License](LICENSE)

## 👥 Contributors

- [Raihan Ahmad Khan](https://github.com/raihanahmadkhan)
