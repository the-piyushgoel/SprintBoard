# 🚀 SprintBoard

A modern, production-grade SaaS project and task management platform built with the MERN stack. Inspired by Trello, Jira, and Linear.

SprintBoard is designed with clean architecture, security best practices, and scalability in mind — ready to grow from authentication to full project management.

---

## ✨ Features

### Phase 1 — Foundation & Authentication

- **Secure Authentication** — Register, Login, Logout with JWT
- **HTTP-Only Cookie Sessions** — Tokens never exposed to client-side JavaScript
- **Persistent Sessions** — Stay logged in across page refreshes
- **Input Validation** — Server-side validation with express-validator
- **Form Validation** — Client-side validation with React Hook Form + Zod
- **Protected Routes** — Role-aware route guards on both client and server
- **Health Endpoint** — Application status, uptime, and database connectivity
- **API Versioning** — Future-proof `/api/v1` route structure
- **Centralized Error Handling** — Consistent error responses across all endpoints
- **Rate Limiting** — Protection against brute-force attacks
- **Modern UI** — Responsive, minimal SaaS interface with Tailwind CSS v4

---

## 🛠 Tech Stack

### Backend

| Technology        | Purpose                    |
| ----------------- | -------------------------- |
| Node.js           | Runtime environment        |
| Express.js        | Web framework              |
| MongoDB Atlas     | Database                   |
| Mongoose          | ODM                        |
| JWT               | Authentication tokens      |
| bcryptjs          | Password hashing           |
| express-validator | Input validation           |
| Helmet            | Security headers           |
| HPP               | Parameter pollution guard  |
| express-rate-limit| Rate limiting              |
| Winston           | Structured logging         |
| Morgan            | HTTP request logging       |
| cookie-parser     | Cookie handling            |
| cors              | Cross-origin requests      |
| dotenv            | Environment variables      |

### Frontend

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| React 19           | UI library                |
| Vite               | Build tool & dev server   |
| Tailwind CSS v4    | Utility-first styling     |
| React Router DOM   | Client-side routing       |
| Axios              | HTTP client               |
| React Hook Form    | Form state management     |
| Zod                | Schema validation         |
| React Hot Toast    | Toast notifications       |

### Developer Tooling

| Tool              | Purpose                    |
| ----------------- | -------------------------- |
| ESLint            | Code linting               |
| Prettier          | Code formatting            |
| Nodemon           | Auto-restart dev server    |

---

## 📁 Folder Structure

```
SprintBoard/
├── .gitignore
├── README.md
│
├── server/
│   ├── config/          # Database connection, env validation
│   ├── constants/       # HTTP status codes, message strings
│   ├── controllers/     # Route handlers (thin, request/response only)
│   ├── middlewares/      # Auth, error handling, 404
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express route definitions
│   ├── services/        # Business logic layer
│   ├── utils/           # Reusable utilities (AppError, logger, etc.)
│   ├── validators/      # express-validator chains
│   ├── app.js           # Express app factory
│   ├── server.js        # Entry point (env, DB, listen)
│   ├── .env.example     # Environment variable template
│   ├── .gitignore
│   ├── .prettierrc
│   ├── eslint.config.js
│   └── package.json
│
├── client/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── assets/      # Images, icons
│   │   ├── components/
│   │   │   └── ui/      # Reusable UI components (Button, Input, etc.)
│   │   ├── context/     # React Context providers
│   │   ├── hooks/       # Custom React hooks
│   │   ├── layouts/     # Page layout wrappers
│   │   ├── pages/       # Page components
│   │   ├── routes/      # Route guards (Protected, Guest)
│   │   ├── services/    # API service layer
│   │   ├── utils/       # Frontend utilities
│   │   ├── App.jsx      # Root component with routing
│   │   ├── main.jsx     # React DOM entry point
│   │   └── index.css    # Tailwind directives & design tokens
│   ├── index.html
│   ├── .env.example
│   ├── .gitignore
│   ├── .prettierrc
│   ├── eslint.config.js
│   ├── vite.config.js
│   └── package.json
```

---

## 🚀 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB instance)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sprintboard.git
cd sprintboard
```

### 2. Backend Setup

```bash
cd server
cp .env.example .env       # Create env file and fill in your values
npm install                 # Install dependencies
npm run dev                 # Start dev server with nodemon
```

### 3. Frontend Setup

```bash
cd client
cp .env.example .env        # Create env file
npm install                  # Install dependencies
npm run dev                  # Start Vite dev server
```

---

## 🔐 Environment Variables

### Backend (`server/.env`)

| Variable       | Description                           | Example                                   |
| -------------- | ------------------------------------- | ----------------------------------------- |
| `NODE_ENV`     | Application environment               | `development`                             |
| `PORT`         | Server port                           | `5000`                                    |
| `MONGO_URI`    | MongoDB connection string             | `mongodb+srv://user:pass@cluster/db`      |
| `JWT_SECRET`   | JWT signing secret (min 32 chars)     | `your_super_secret_key_here`              |
| `JWT_EXPIRE`   | JWT token expiration                  | `7d`                                      |
| `COOKIE_EXPIRE`| Cookie expiration in days             | `7`                                       |
| `CLIENT_URL`   | Frontend origin for CORS              | `http://localhost:5173`                   |

### Frontend (`client/.env`)

| Variable        | Description                          | Example                                  |
| --------------- | ------------------------------------ | ---------------------------------------- |
| `VITE_API_URL`  | Backend API base URL                 | `http://localhost:5000/api/v1`           |

---

## 📜 Available Scripts

### Backend (`server/`)

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start with nodemon (auto-reload) |
| `npm start`       | Start in production mode         |
| `npm run lint`    | Run ESLint                       |
| `npm run lint:fix`| Run ESLint with auto-fix         |
| `npm run format`  | Format code with Prettier        |

### Frontend (`client/`)

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start Vite dev server            |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build         |
| `npm run lint`    | Run ESLint                       |
| `npm run lint:fix`| Run ESLint with auto-fix         |
| `npm run format`  | Format code with Prettier        |

---

## 📡 API Endpoints

### Health

| Method | Endpoint           | Description              | Auth |
| ------ | ------------------ | ------------------------ | ---- |
| GET    | `/api/v1/health`   | Application health check | No   |

### Authentication

| Method | Endpoint               | Description              | Auth |
| ------ | ---------------------- | ------------------------ | ---- |
| POST   | `/api/v1/auth/register`| Create new account       | No   |
| POST   | `/api/v1/auth/login`   | Sign in                  | No   |
| POST   | `/api/v1/auth/logout`  | Sign out                 | Yes  |
| GET    | `/api/v1/auth/me`      | Get current user         | Yes  |

### Response Format

**Success:**
```json
{
  "success": true,
  "message": "Descriptive success message",
  "data": {}
}
```

**Error:**
```json
{
  "success": false,
  "message": "Descriptive error message",
  "errors": []
}
```

---

## 🚢 Deployment Guide

### Backend (Render / Railway)

1. Push code to GitHub
2. Create a new Web Service on [Render](https://render.com) or [Railway](https://railway.app)
3. Set root directory to `server`
4. Set build command to `npm install`
5. Set start command to `npm start`
6. Add all environment variables from `.env.example`
7. Set `NODE_ENV` to `production`

### Frontend (Vercel / Netlify)

1. Create a new project on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
2. Set root directory to `client`
3. Set build command to `npm run build`
4. Set output directory to `dist`
5. Add `VITE_API_URL` environment variable pointing to your deployed backend
6. Add redirect rule: `/* → /index.html` (for SPA routing)

---

## 🗺 Future Roadmap

| Phase | Features                                                  |
| ----- | --------------------------------------------------------- |
| 2     | Project CRUD, Task CRUD, Kanban boards                    |
| 3     | Team management, member invitations, role-based access    |
| 4     | Real-time updates, notifications, activity feed           |
| 5     | Analytics dashboard, charts, reporting                    |
| 6     | File uploads, calendar view, integrations                 |

---

## 📄 License

This project is licensed under the MIT License.
