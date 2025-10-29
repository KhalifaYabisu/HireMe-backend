# HireMe - Job Discovery Platform

A full-stack job discovery platform inspired by [Closely](https://closely.ng). Find jobs around your area, post job listings, and connect workers with opportunities.

## 🚀 Features

- **Find Jobs**: Browse available job listings filtered by your area
- **Set Your Area**: Specify your location to get personalized job recommendations
- **Post a Job**: Employers can post job opportunities
- **User Authentication**: Sign up and login with secure JWT tokens
- **Admin Dashboard**: Manage workers and listings
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📁 Project Structure

```
hireme/
├── workwhiz-backend/     # Node.js + Express backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── workwhiz-frontend/     # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── contexts/
│   └── public/
└── render.yaml           # Render deployment blueprint
```

## 🛠️ Tech Stack

**Frontend:**
- React 19
- React Router
- Custom CSS (no frameworks)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd workwhiz-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/workwhiz
JWT_SECRET=your-secret-key-here-change-this
ALLOWED_ORIGIN=http://localhost:3000
```

4. Create admin user (optional):
```bash
npm run create-admin
```

5. Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd workwhiz-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
REACT_APP_API_BASE=http://localhost:5000
```

4. Start development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🌐 Deployment on Render

### Option 1: Using Blueprint (Recommended)

1. Push your code to GitHub
2. In Render dashboard, click **New → Blueprint**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and create both services
5. Add environment variables:
   - **Backend**: `MONGODB_URI`, `JWT_SECRET`
   - **Frontend**: `REACT_APP_API_BASE` (auto-populated from backend URL)

### Option 2: Manual Setup

#### Backend Service

1. Create a **Web Service**
2. Connect your GitHub repository
3. Settings:
   - **Root Directory**: `workwhiz-backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Environment Variables:
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   PORT=5000
   ALLOWED_ORIGIN=https://your-frontend-url.onrender.com
   ```

#### Frontend Service

1. Create a **Static Site**
2. Connect your GitHub repository
3. Settings:
   - **Root Directory**: `workwhiz-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. Environment Variables:
   ```
   REACT_APP_API_BASE=https://your-backend-url.onrender.com
   ```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user

### Workers/Jobs
- `GET /api/workers` - Get all workers/jobs
- `GET /api/workers/:id` - Get single worker
- `POST /api/workers` - Create new job posting
- `PUT /api/workers/:id` - Update worker
- `DELETE /api/workers/:id` - Delete worker

### Admin
- `POST /api/admin/login` - Admin login

## 🎨 Adding UI Components

### Toast Notifications

Use the toast context for user feedback:

```javascript
import { useToast } from "../contexts/ToastContext";

function MyComponent() {
  const { showToast } = useToast();
  
  const handleAction = () => {
    showToast("Success message!", "success");
    // or
    showToast("Error message", "error");
  };
}
```

### Loading Spinner

Show loading states:

```javascript
import LoadingSpinner from "../components/LoadingSpinner";

<button disabled={loading}>
  {loading ? <LoadingSpinner size={16} /> : "Submit"}
</button>
```

### Responsive Design

The app includes mobile-responsive breakpoints at 768px. Navbar, filters, and grids automatically adapt for smaller screens.

## 🔧 Customization

### Branding
- Update logo/brand name in `components/Navbar.js`
- Modify colors in `src/App.css`

### Static Pages
Edit content in:
- `pages/About.js`
- `pages/Contact.js`
- `pages/Privacy.js`

### Styling
All styles are in `src/App.css`. Key classes:
- `.nav` - Navigation bar
- `.hero` - Hero section
- `.card` - Card components
- `.btn` - Buttons
- `.toast` - Toast notifications

## 🐛 Troubleshooting

**Backend won't connect to MongoDB:**
- Check `MONGODB_URI` in `.env`
- Ensure MongoDB is running (if local)

**CORS errors:**
- Verify `ALLOWED_ORIGIN` matches your frontend URL

**Frontend can't reach backend:**
- Check `REACT_APP_API_BASE` in frontend `.env`
- Ensure backend service is running

## 📄 License

© 2025 The 84 Percent

## 🙏 Acknowledgments

Inspired by [Closely](https://closely.ng) - a platform for connecting workers with opportunities.
