import { Link } from 'react-router-dom';
import { Clock, BookOpen, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CourseCard({ course, index = 0 }) {
  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-brand-emerald/10 text-brand-emerald border-brand-emerald/20';
      case 'intermediate': return 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20';
      case 'advanced': return 'bg-brand-pink/10 text-brand-pink border-brand-pink/20';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="glass rounded-2xl overflow-hidden border border-white/10 group hover:border-brand-purple/50 transition-all duration-300 hover:shadow-card-hover flex flex-col h-full bg-dark-900/60"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title.en} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border backdrop-blur-md ${getLevelColor(course.level)} capitalize`}>
            {course.level}
          </span>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg border backdrop-blur-md bg-black/40 text-brand-cyan border-brand-cyan/30 flex items-center gap-1">
            {course.category?.icon} {course.category?.name?.en}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow relative">
        {/* Instructor Avatar (Floating) */}
        <div className="absolute -top-6 right-5 w-12 h-12 rounded-full border-4 border-dark-950 bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center shadow-lg">
          <span className="font-bold text-sm">{course.instructor?.username?.charAt(0) || 'I'}</span>
        </div>

        <h3 className="font-bold text-lg leading-tight mb-2 pr-12 group-hover:text-brand-purple transition-colors">
          {course.title.en}
        </h3>
        
        <p className="text-sm text-white/50 line-clamp-2 mb-4 flex-grow">
          {course.short_description.en}
        </p>

        {/* Course Meta Info */}
        <div className="flex items-center gap-4 text-xs text-white/60 mb-5 pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand-cyan" />
            <span>{course.duration_hours}h</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-brand-purple" />
            <span>{course.lessons_count} Lessons</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-white/90">4.8</span>
            <span className="text-white/40">({course.enrolled_count})</span>
          </div>
        </div>

        {/* Footer / Action */}
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl">
            {course.is_free ? (
              <span className="text-brand-emerald">Free</span>
            ) : (
              <span className="text-white">${course.price}</span>
            )}
          </div>
          <Link 
            to={`/courses/${course.id}`}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-white/5 border border-white/10 hover:bg-gradient-to-r hover:from-brand-purple hover:to-brand-cyan hover:border-transparent transition-all duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
