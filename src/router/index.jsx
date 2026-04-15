import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Courses from '../pages/Courses';
import CourseDetail from '../pages/CourseDetail';
import Classroom from '../pages/Classroom';
import QuizPage from '../pages/QuizPage';
import VerifyCertificate from '../pages/VerifyCertificate';
import AdminDashboard from '../pages/AdminDashboard';
import Profile from '../pages/Profile';
import { useAuth } from '../context/AuthContext';

// Layout wrapper that includes Navbar and Footer
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/classroom/:courseId" 
            element={<ProtectedRoute><Classroom /></ProtectedRoute>} 
          />
          <Route 
            path="/classroom/:courseId/lesson/:lessonId" 
            element={<ProtectedRoute><Classroom /></ProtectedRoute>} 
          />
          <Route 
            path="/quiz/:id" 
            element={<ProtectedRoute><QuizPage /></ProtectedRoute>} 
          />
          <Route 
            path="/admin" 
            element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/profile" 
            element={<ProtectedRoute><Profile /></ProtectedRoute>} 
          />

          {/* Temporary mock routes for development */}

          <Route path="/verify" element={<VerifyCertificate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
