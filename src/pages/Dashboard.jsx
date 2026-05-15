import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Award, Clock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profileService, certificatesService } from '../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      profileService.getProfile().catch(() => null),
      certificatesService.getMyCertificates().catch(() => [])
    ]).then(([profileData, certsData]) => {
      setProfile(profileData || {});
      setCertificates(certsData || []);
    }).catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="min-h-screen pt-24 flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-brand-cyan" /></div>;

  const enrolledCourses = profile?.enrolledCourses || [];

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.username?.split(' ')[0]} 👋</h1>
        <p className="text-white/50">Here is what is happening with your courses today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-purple/20 flex items-center justify-center text-brand-purple">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">{enrolledCourses.length || 0}</div>
            <div className="text-sm text-white/50">Active Courses</div>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-emerald/20 flex items-center justify-center text-brand-emerald">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">{certificates.length || 0}</div>
            <div className="text-sm text-white/50">Certificates Earned</div>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">12h</div>
            <div className="text-sm text-white/50">Total Learning Time</div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enrolledCourses.slice(0, 2).map((course, i) => (
          <Link 
            key={course.id || i}
            to={`/classroom/${course.id}`}
            className="block"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="h-full glass rounded-2xl overflow-hidden border border-white/10 group cursor-pointer hover:border-brand-purple/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div className="w-full sm:w-48 h-40 sm:h-auto shrink-0 relative overflow-hidden bg-dark-900 flex items-center justify-center text-white/20">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={typeof course.title === 'object' ? (course.title?.en || course.title?.ar) : course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : <BookOpen className="w-10 h-10" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent sm:hidden" />
                </div>
                <div className="p-6 flex flex-col justify-center flex-grow">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-brand-purple transition-colors">{typeof course.title === 'object' ? (course.title?.en || course.title?.ar) : (course.title || 'Course')}</h3>
                  <p className="text-sm text-white/50 mb-4 line-clamp-2">{typeof course.short_description === 'object' ? (course.short_description?.en || course.short_description?.ar) : (course.short_description || 'No description available')}</p>
                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-xs text-white/70">
                      <span>Progress</span>
                      <span>{course.id === 1 ? '45%' : '12%'}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan rounded-full" 
                        style={{ width: course.id === 1 ? '45%' : '12%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      {enrolledCourses.length === 0 && (
        <div className="text-center py-12 glass rounded-2xl border border-white/5 mt-6">
          <BookOpen className="w-10 h-10 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No active courses</h3>
          <p className="text-white/50 mb-6">You haven't enrolled in any courses yet.</p>
          <Link to="/courses" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
}
