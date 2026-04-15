import { motion } from 'framer-motion';
import { Users, BookOpen, Award, TrendingUp, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ANALYTICS } from '../data/mockData';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user } = useAuth();
  
  // Basic admin guard mock
  if (user?.role !== 'admin' && user?.role !== 'student') { 
    // Allowing student to view it just for demo purposes right now
    // return <Navigate to="/dashboard" />;
  }

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto w-full">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <div className="text-brand-pink text-sm font-bold tracking-widest uppercase mb-1">Admin Portal</div>
          <h1 className="text-3xl font-bold">Platform Analytics</h1>
        </div>
        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
          Download Report
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Students', value: ANALYTICS.total_students, icon: Users, color: 'text-brand-cyan', bg: 'bg-brand-cyan/20' },
          { label: 'Active Courses', value: ANALYTICS.total_courses, icon: BookOpen, color: 'text-brand-purple', bg: 'bg-brand-purple/20' },
          { label: 'Total Enrollments', value: ANALYTICS.total_enrollments, icon: TrendingUp, color: 'text-brand-emerald', bg: 'bg-brand-emerald/20' },
          { label: 'Certificates Issued', value: ANALYTICS.total_certificates, icon: Award, color: 'text-yellow-500', bg: 'bg-yellow-500/20' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 ${stat.bg} rounded-full blur-[40px] group-hover:scale-150 transition-transform`} />
            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 relative z-10`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold mb-1 relative z-10">{stat.value.toLocaleString()}</div>
            <div className="text-sm text-white/50 relative z-10">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hardest Courses */}
        <div className="glass p-8 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-brand-pink" />
            <h2 className="text-xl font-bold">Hardest Courses</h2>
          </div>
          <p className="text-sm text-white/50 mb-6">Courses with the highest quiz fail rates</p>
          
          <div className="space-y-6">
            {ANALYTICS.hardest_courses.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">{item.course}</span>
                  <span className="text-brand-pink">{item.fail_rate}% Fail Rate</span>
                </div>
                <div className="h-2 w-full bg-dark-900 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-pink to-brand-purple rounded-full" 
                    style={{ width: `${item.fail_rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avg Completion Time */}
        <div className="glass p-8 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-brand-cyan" />
            <h2 className="text-xl font-bold">Avg Completion Time</h2>
          </div>
          <p className="text-sm text-white/50 mb-6">Average days students take to finish a course</p>
          
          <div className="space-y-4">
            {ANALYTICS.completion_times.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-dark-900/50 rounded-xl border border-white/5">
                <div className="text-sm font-semibold max-w-[200px] truncate">{item.course}</div>
                <div className="flex items-center gap-2">
                  <div className="text-brand-cyan font-bold text-lg">{item.avg_days}</div>
                  <div className="text-xs text-white/40 uppercase">Days</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
